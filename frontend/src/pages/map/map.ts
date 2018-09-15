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

// providers
import { GlobalProvider } from '../../providers/global/global'


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: GoogleMap
  isMapReady: boolean = false
  walkers: any = {}
  walkersQty: number = 0
  subscriptions: any = {
    markers: null,
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
        self.updateMakers()
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
    if(!this.platform.is('cordova'))
      self.loadingSpinner.dismiss()

    // Wait the MAP_READY before using any methods.
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      () => {
        self.isMapReady = true
        self.updateMakers(true)
        self.loadingSpinner.dismiss()
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
        watch = this._geolocation.watchPosition(),
        profile = JSON.parse(this.globalProvider.getStorage('profile'))
console.log('1- watching')

    setInterval(() => {
      self._socket.emit('set-nickname', {
        idsocket: self._socket.ioSocket.id,
        id: profile.user_id,
        name: profile.name,
        avatar: profile.avatar,
        latitude:  self.globalProvider.geolocation.latitude,
        longitude:  self.globalProvider.geolocation.longitude,
        user_type: profile.user_type
      })
    }, 3000)




    watch.subscribe(
      (data) => {
        console.log('2- subscribed')
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        if(data.coords) {
          self.globalProvider.geolocation.latitude = data.coords.latitude
          self.globalProvider.geolocation.longitude = data.coords.longitude
          self.globalProvider.isGeolocated = true
          self.globalProvider.geolocationHasError = false
        }
        else {
          self.globalProvider.geolocationHasError = true
        }
        /*
        self._socket.emit('set-nickname', {
          idsocket: self._socket.ioSocket.id,
          id: profile.user_id,
          name: profile.name,
          avatar: profile.avatar,
          latitude:  self.globalProvider.geolocation.latitude,
          longitude:  self.globalProvider.geolocation.longitude,
          user_type: profile.user_type
        })
        */
      }
    )

  }


  updateMakers(animation?) {
    let self = this,
        profile = JSON.parse(this.globalProvider.getStorage('profile'))

    this.map.clear().then(
      () => {

        // clean subscriptions
        self.walkersQty = 0
        self.subscriptions.markers ? self.subscriptions.markers.unsubscribe() : null
        const userType = profile.user_type

        // end user type 1
        if(userType == 1)
          for(let walker in this.walkers) {
            self.walkersQty++

            if(self.walkers[walker].id != profile.user_id && self.walkers[walker].user_type != userType) {
              let marker: MarkerOptions = {
                icon: {
                  url: '../assets/imgs/dog.png'
                },
                animation: animation ? 'DROP' : null,
                position: {
                  lat: self.walkers[walker].latitude,
                  lng: self.walkers[walker].longitude,
                }
              }
              // Now you can use all methods safely.
              self.map.addMarker(marker).then(marker => {
                self.subscriptions.markers = marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                  let data = {
                    id: self.walkers[walker].id,
                    name: self.walkers[walker].name,
                    avatar: self.walkers[walker].avatar
                  }
                  self.userPreview(data)
                })
              })
            }

          }

        // end user type 1

        else
          for(let walker in this.walkers) {
            self.walkersQty++

            if(self.walkers[walker].id != profile.user_id && self.walkers[walker].user_type != userType) {
              let marker: MarkerOptions = {
                icon: {
                  url: '../assets/imgs/person.png'
                },
                animation: animation ? 'DROP' : null,
                position: {
                  lat: self.walkers[walker].latitude,
                  lng: self.walkers[walker].longitude,
                }
              }
              // Now you can use all methods safely.
              self.map.addMarker(marker).then(marker => {
                self.subscriptions.markers = marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                  let data = {
                    id: self.walkers[walker].id,
                    name: self.walkers[walker].name,
                    avatar: self.walkers[walker].avatar
                  }
                  self.userPreview(data)
                })
              })
            }

          }


      }
    )
  }


  userPreview(data) {
    console.log('data received: ', data)
    let modal = this.modalCtrl.create(UserPreviewPage, data)
        modal.present()
  }


  userPreviewTest() {
    const data = {
      id: "5b8f0dcf277eb62aa82660ea",
      name: "Paseador Nico",
      avatar: null
    }
    let modal = this.modalCtrl.create(UserPreviewPage, data)
        modal.present()
  }

}
