import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 LatLng,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Socket } from 'ng-socket-io';

// pages
import { UserPreviewPage } from '../user-preview/user-preview';

// providers
import { GlobalProvider } from '../../providers/global/global';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _googleMaps: GoogleMaps,
    private _geolocation: Geolocation,
    private _socket: Socket,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidEnter() {

    let self = this
    let geolocation = this._globalProvider.geolocation
    this.loadMap(geolocation.latitude, geolocation.longitude)


    this._socket.connect()

    this._socket.on('connect', (data) => {
      self.watchGeolocation()
    })

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
  }


  click() {
    // this.updateMakers()
    let data = {
      id: 14,
      name: 'Juan Taboda',
      avatar: 'https://ta.azureedge.net/p/images/usuarios/l/878872.jpg/300x300cut/?v=2',
      price: 140,
      reputation: 4
    }

    this.userPreview(data)
  }


  loadMap(latitude?: number, longitude?: number) {

    let self = this

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

    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      () => {
        self.isMapReady = true
        self.updateMakers(true)
      }
    )

    // move map to actual position
    this._geolocation.getCurrentPosition().then(
      (res) => {

        let position = {
          target: new LatLng(res.coords.latitude, res.coords.longitude),
          zoom: 15,
          tilt: 30
        }
        self.map.moveCamera(position)

        self._globalProvider.geolocation.latitude = res.coords.latitude
        self._globalProvider.geolocation.longitude = res.coords.longitude
      },
      (err) => {
        console.log(err)
        self._globalProvider.toast('Ocurrió un problema al geolocalizar')
      }
    )

  }


  watchGeolocation() {
    let self = this,
        watch = this._geolocation.watchPosition(),
        profile = JSON.parse(this._globalProvider.getStorage('profile'))

    watch.subscribe(
      (data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        if(data.coords) {
          self._globalProvider.geolocation.latitude = data.coords.latitude
          self._globalProvider.geolocation.longitude = data.coords.longitude
        }

        self._socket.emit('set-nickname', {
          idsocket: self._socket.ioSocket.id,
          id: profile.user_id,
          name: profile.name,
          avatar: profile.avatar,
          latitude:  self._globalProvider.geolocation.latitude,
          longitude:  self._globalProvider.geolocation.longitude
        })
      }
    )

  }


  updateMakers(animation?) {
    let self = this,
        profile = JSON.parse(this._globalProvider.getStorage('profile'))

    this.map.clear().then(
      () => {

        // clean subscriptions
        self.walkersQty = 0
        self.subscriptions.markers ? self.subscriptions.markers.unsubscribe() : null


        for(let walker in this.walkers) {

          self.walkersQty++

          if(self.walkers[walker].id != profile.user_id) {
            let marker = {
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red.png'
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
                  id: self.walkers[walker].iduser,
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
    alert('preview')
    let modal = this.modalCtrl.create(UserPreviewPage, data)
        modal.present()
  }

}
