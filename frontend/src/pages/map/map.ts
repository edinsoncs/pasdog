import { Component } from '@angular/core'
import { NavController, NavParams, ModalController, LoadingController, Platform, Events } from 'ionic-angular'
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 LatLng,
 MarkerOptions
} from '@ionic-native/google-maps'
import { Geolocation } from '@ionic-native/geolocation'
import { Socket } from 'ng-socket-io'

// pages
import { UserPreviewPage } from '../user-preview/user-preview'
import { ListHistoryPage } from '../list-history/list-history'
import { ChatPage } from '../chat/chat'

// providers
import { GlobalProvider } from '../../providers/global/global'


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: GoogleMap
  isMapReady: boolean = false

  walkersParsed: any = {}
  walkers: any = {}
  walkersQty: number = 0
  mapIcon: string

  subscriptions: any = {
    subscriptions: {},
    markers: {},
    watch: null
  }
  loadingSpinner: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public events: Events,
    private _geolocation: Geolocation,
    private _socket: Socket,
    public globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {

    let self = this,
        geolocation = this.globalProvider.geolocation

    this.loadingSpinner = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    this.loadingSpinner.present()


    this.loadMap(geolocation.latitude, geolocation.longitude)


    // socket.io
    this._socket.connect()
    /*
    this._socket.on('connection', (data) => {
      console.log('ON CONNECT')
      alert('ON CONNECT')
    })
    */

    self.watchGeolocation()

    this._socket.on('listmap', (data) => {
      if(data){
        console.log('SOCKET DATA!', data)
        self.walkers = data
        self.updateMarkers()
      }
      else {
        self.walkers = {}
        console.log('No socket data')
      }
    })

    this.events.subscribe('nav', (params) => {
      switch(params.page) {
        case 'list-history':
          self.navCtrl.setRoot(ListHistoryPage)
          break
        case 'chat':
          self.navCtrl.push(ChatPage, params.payload)
          break
      }
    })

  }


  loadMap(latitude?: number, longitude?: number) {

    let self = this

    if(this.globalProvider.isGeolocated) {
      latitude = this.globalProvider.geolocation.latitude
      longitude = this.globalProvider.geolocation.longitude
    }

    let mapOptions: GoogleMapOptions = {
      controls: {
				myLocationButton: true,
				//indoorPicker: true,
			},
      gestures: {
        zoom: true,
        rotate: false
      },
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 18,
        tilt: 30
      }
    }

    this.map = GoogleMaps.create('map', mapOptions)
    setTimeout(() => self.loadingSpinner.dismiss(), 1000)

    // Wait the MAP_READY before using any methods.
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      () => {
        self.isMapReady = true
        self.updateMarkers(true)
        self.loadingSpinner = null

        // move map to actual position
        this._geolocation.getCurrentPosition().then(
          (res) => {
            let position = {
              target: new LatLng(res.coords.latitude, res.coords.longitude),
              zoom: 15,
              tilt: 30
            }
            self.map.moveCamera(position)
            self.globalProvider.geolocation.latitude = res.coords.latitude
            self.globalProvider.geolocation.longitude = res.coords.longitude
            self.globalProvider.isGeolocated = true
            self.globalProvider.geolocationHasError = false
          },
          (err) => {
            console.log(err)
            self.globalProvider.toast('Ocurrió un problema al geolocalizar')
            self.globalProvider.geolocationHasError = true
          }
        )

      }
    )

  }


  watchGeolocation() {
    let self = this,
        watch = this._geolocation.watchPosition({maximumAge: 10000}),
        profile = JSON.parse(this.globalProvider.getStorage('profile')),
        latitude = self.globalProvider.geolocation.latitude,
        longitude = self.globalProvider.geolocation.longitude

    self._socket.emit('set-nickname', {
      idsocket: self._socket.ioSocket.id,
      id: profile.user_id,
      name: profile.name,
      avatar: profile.avatar,
      latitude:  latitude ? latitude : -34.6036845,
      longitude:  latitude ? latitude : -58.3816649,
      user_type: profile.user_type
    })

    switch(Number(profile.user_type)) {
      case 0:
        this.mapIcon = this.globalProvider.walkerIcon
        break
      case 1:
        this.mapIcon = this.globalProvider.userIcon
        break
    }

    watch.subscribe(
      (data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        if(data.coords) {
          self.globalProvider.geolocation.latitude = data.coords.latitude
          self.globalProvider.geolocation.longitude = data.coords.longitude
          self.globalProvider.isGeolocated = true
          self.globalProvider.geolocationHasError = false

          self._socket.emit('set-nickname', {
            idsocket: self._socket.ioSocket.id,
            id: profile.user_id,
            name: profile.name,
            avatar: profile.avatar,
            latitude:  self.globalProvider.geolocation.latitude,
            longitude:  self.globalProvider.geolocation.longitude,
            user_type: profile.user_type
          })
        }

        else
          self.globalProvider.geolocationHasError = true
      }
    )

  }


  updateMarkers(animation?) {
    let self = this,
        profile = JSON.parse(this.globalProvider.getStorage('profile'))

      switch(Number(profile.user_type)) {
        case 0:
          this.updateMarkersWalkers(animation)
          break
        case 1:
          this.updateMarkersUsers(animation)
          break
      }
  }


  updateMarkersWalkers(animation?) {
    console.log('update markers for walkers', this.walkersParsed)

    let self = this,
        profile = JSON.parse(this.globalProvider.getStorage('profile'))

    // only first
    if(this.isEmpty(this.walkersParsed)) {
      this.walkersQty = 0

      for(let walkerName in this.walkers) {
        if(this.walkers[walkerName].id != profile.user_id && Number(this.walkers[walkerName].user_type) == 1) {
          this.walkersQty ++
          this.walkersParsed[this.walkers[walkerName].id] = this.walkers[walkerName]
        }
      }

      for(let walkerId in this.walkersParsed) {
        // construct map
        let marker = {
          icon: {
            url: 'https://cdn.emojidex.com/emoji/px32/person_with_blond_hair%28p%29.png'
          },
          animation: animation ? 'DROP' : null,
          position: {
            lat: self.walkersParsed[walkerId].latitude,
            lng: self.walkersParsed[walkerId].longitude,
          }
        }

        // Now you can use all methods safely.
        self.map.addMarker(marker).then(mkr => {
          self.subscriptions.markers[walkerId] = mkr

          self.subscriptions.subscriptions[walkerId] = self.subscriptions.markers[walkerId].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            let data = {
              id: self.walkersParsed[walkerId].id,
              name: self.walkersParsed[walkerId].name,
              avatar: self.walkersParsed[walkerId].avatar,
              user_type: self.walkersParsed[walkerId].user_type
            }
            self.userPreview(data)
          })
        })
        // construct map
      }

      console.log('walker parsed: ', this.walkersParsed)
    }



    else {
      // FIXME: falta verificar el user_type = 1
      // busca walkers para eliminar/actualizar


      self.map.clear().then(() => {
        for(let walkerId in this.walkersParsed) {
          const walkerName = this.walkersParsed[walkerId].name

          if(!this.walkers[walkerName]) {
            console.log('elimina este walker de acá y del mapa (' + walkerId + ')')
            try {
              self.subscriptions.markers[walkerId].remove()
            }
            catch(e) {
              console.log('no se pudo eliminar el marker')
            }
            delete self.walkersParsed[walkerId]
            self.walkersQty --
          }

          else {
            console.log('calcula posición de este walker para ver si hay que actualizarla (' + walkerId + ')')
            delete self.walkersParsed[walkerId]
            self.walkersParsed[walkerId] = self.walkers[walkerName]
            try {
              self.subscriptions.markers[walkerId].remove()
            }
            catch(e) {
              console.log('no se pudo eliminar el marker')
            }

            // validation is map working

            let marker = {
              icon: {
                url: 'https://cdn.emojidex.com/emoji/px32/person_with_blond_hair%28p%29.png'
                // url: `http://maps.google.com/mapfiles/ms/icons/blue.png`
              },
              animation: animation ? 'DROP' : null,
              position: {
                lat: self.walkersParsed[walkerId].latitude,
                lng: self.walkersParsed[walkerId].longitude,
              }
            }

            // Now you can use all methods safely.
            self.map.addMarker(marker).then(mkr => {
              self.subscriptions.markers[walkerId] = mkr

              self.subscriptions.subscriptions[walkerId] = self.subscriptions.markers[walkerId].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                let data = {
                  id: self.walkersParsed[walkerId].id,
                  name: self.walkersParsed[walkerId].name,
                  avatar: self.walkersParsed[walkerId].avatar,
                  user_type: self.walkersParsed[walkerId].user_type
                }
                self.userPreview(data)
              })
            })
            // end validation is map working

          }
        }


        // busca walkers para agregar
        for(let walkerName in this.walkers) {
          const walkerId = this.walkers[walkerName].id

          if(!this.walkersParsed[walkerId])
            if(walkerId != profile.user_id && this.walkers[walkerName].user_type == 1) {
              this.walkersQty ++
              this.walkersParsed[walkerId] = this.walkers[walkerName]
              console.log('agrega este walker acá y al mapa (' + walkerId + ')')

              let marker = {
                icon: {
                  url: 'https://cdn.emojidex.com/emoji/px32/person_with_blond_hair%28p%29.png'
                  // url: `http://maps.google.com/mapfiles/ms/icons/yellow.png`
                },
                animation: null,
                position: {
                  lat: self.walkersParsed[walkerId].latitude,
                  lng: self.walkersParsed[walkerId].longitude,
                }
              }

              // Now you can use all methods safely.
              self.map.addMarker(marker).then(mkr => {
                self.subscriptions.markers[walkerId] = mkr

                self.subscriptions.subscriptions[walkerId] = self.subscriptions.markers[walkerId].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                  let data = {
                    id: self.walkersParsed[walkerId].id,
                    name: self.walkersParsed[walkerId].name,
                    avatar: self.walkersParsed[walkerId].avatar,
                    user_type: self.walkersParsed[walkerId].user_type
                  }
                  self.userPreview(data)
                })
              })

            }

        }
      })

    }

  }


  updateMarkersUsers(animation?) {
    console.log('update markers for users', this.walkersParsed)

    // `http://packrat.wdfiles.com/local--files/packrat-best-in-show/buddy-the-dog_small.gif`
    let self = this,
        profile = JSON.parse(this.globalProvider.getStorage('profile'))

    // only first
    if(this.isEmpty(this.walkersParsed)) {
      this.walkersQty = 0

      for(let walkerName in this.walkers) {
        if(this.walkers[walkerName].id != profile.user_id && Number(this.walkers[walkerName].user_type) == 0) {
          this.walkersQty ++
          this.walkersParsed[this.walkers[walkerName].id] = this.walkers[walkerName]
        }
      }


      for(let walkerId in this.walkersParsed) {
        // construct map
        let marker = {
          icon: {
            url: 'http://packrat.wdfiles.com/local--files/packrat-best-in-show/buddy-the-dog_small.gif'
            // url: `http://maps.google.com/mapfiles/ms/icons/yellow.png`
          },
          animation: animation ? 'DROP' : null,
          position: {
            lat: self.walkersParsed[walkerId].latitude,
            lng: self.walkersParsed[walkerId].longitude,
          }
        }

        // Now you can use all methods safely.
        self.map.addMarker(marker).then(mkr => {
          self.subscriptions.markers[walkerId] = mkr

          self.subscriptions.subscriptions[walkerId] = self.subscriptions.markers[walkerId].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            let data = {
              id: self.walkersParsed[walkerId].id,
              name: self.walkersParsed[walkerId].name,
              avatar: self.walkersParsed[walkerId].avatar,
              user_type: self.walkersParsed[walkerId].user_type
            }
            self.userPreview(data)
          })
        })
        // construct map
      }

      console.log('users parsed: ', this.walkersParsed)
    }



    else {
      // FIXME: falta verificar el user_type = 1
      // busca walkers para eliminar/actualizar


      self.map.clear().then(() => {
        for(let walkerId in this.walkersParsed) {
          const walkerName = this.walkersParsed[walkerId].name

          if(!this.walkers[walkerName]) {
            console.log('elimina este user de acá y del mapa (' + walkerId + ')')
            try {
              self.subscriptions.markers[walkerId].remove()
            }
            catch(e) {
              console.log('no se pudo eliminar el user')
            }
            delete self.walkersParsed[walkerId]
            self.walkersQty --
          }

          else {
            console.log('calcula posición de este user para ver si hay que actualizarla (' + walkerId + ')')
            delete self.walkersParsed[walkerId]
            self.walkersParsed[walkerId] = self.walkers[walkerName]
            try {
              self.subscriptions.markers[walkerId].remove()
            }
            catch(e) {
              console.log('no se pudo eliminar el marker')
            }

            // validation is map working

            let marker = {
              icon: {
                url: 'http://packrat.wdfiles.com/local--files/packrat-best-in-show/buddy-the-dog_small.gif'
                // url: `http://maps.google.com/mapfiles/ms/icons/blue.png`
              },
              animation: animation ? 'DROP' : null,
              position: {
                lat: self.walkersParsed[walkerId].latitude,
                lng: self.walkersParsed[walkerId].longitude,
              }
            }

            // Now you can use all methods safely.
            self.map.addMarker(marker).then(mkr => {
              self.subscriptions.markers[walkerId] = mkr

              self.subscriptions.subscriptions[walkerId] = self.subscriptions.markers[walkerId].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                let data = {
                  id: self.walkersParsed[walkerId].id,
                  name: self.walkersParsed[walkerId].name,
                  avatar: self.walkersParsed[walkerId].avatar,
                  user_type: self.walkersParsed[walkerId].user_type
                }
                self.userPreview(data)
              })
            })
            // end validation is map working

          }
        }


        // busca walkers para agregar
        for(let walkerName in this.walkers) {
          const walkerId = this.walkers[walkerName].id

          if(!this.walkersParsed[walkerId])
            if(walkerId != profile.user_id && this.walkers[walkerName].user_type == 0) {
              this.walkersQty ++
              this.walkersParsed[walkerId] = this.walkers[walkerName]
              console.log('agrega este walker acá y al mapa (' + walkerId + ')')

              let marker = {
                icon: {
                  url: 'http://packrat.wdfiles.com/local--files/packrat-best-in-show/buddy-the-dog_small.gif'
                  // url: `http://maps.google.com/mapfiles/ms/icons/yellow.png`
                },
                animation: null,
                position: {
                  lat: self.walkersParsed[walkerId].latitude,
                  lng: self.walkersParsed[walkerId].longitude,
                }
              }

              // Now you can use all methods safely.
              self.map.addMarker(marker).then(mkr => {
                self.subscriptions.markers[walkerId] = mkr

                self.subscriptions.subscriptions[walkerId] = self.subscriptions.markers[walkerId].on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                  let data = {
                    id: self.walkersParsed[walkerId].id,
                    name: self.walkersParsed[walkerId].name,
                    avatar: self.walkersParsed[walkerId].avatar,
                    user_type: self.walkersParsed[walkerId].user_type
                  }
                  self.userPreview(data)
                })
              })

            }

        }
      })

    }

  }


  userPreview(data) {
    let modal
    switch(data.user_type) {
      case 0:
        this.modalCtrl.create(UserPreviewPage, data)
        break
      case 1:
        this.modalCtrl.create(UserPreviewPage, data)
        break
      default:
        this.globalProvider.toast('No se puede ver el usuario seleccionado')
        break
    }

    modal.present()
  }


  userPreviewTest() {
    const data = {
      id: "5a7e5d228b606e0bb3b9a05b",
      name: "Nico",
      avatar: "HkJEMRsr7.png",
      user_type: 0
    }
    let modal = this.modalCtrl.create(UserPreviewPage, data)
        modal.present()
  }


  walkerPreviewTest() {
    const data = {
      id: "5b8f0dcf277eb62aa82660ea",
      name: "Paseador Nico",
      avatar: null,
      user_type: 1
    }
    let modal = this.modalCtrl.create(UserPreviewPage, data)
        modal.present()
  }


  private isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false
    }
    return true
  }

}
