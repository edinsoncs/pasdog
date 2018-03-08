import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
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
  walkers: any = []

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
    this._socket.connect()

    let self = this
    let geolocation = this._globalProvider.geolocation

    this._socket.on('connect', (data) => {
      self.loadMap(geolocation.latitude, geolocation.longitude)
      self.watchGeolocation()
    })

    this._socket.on('listmap', (data) => {
       if(data){
         console.log('SOCKET DATA!', data)
         self.walkers = data
         self.updateMakers()
       }
       else {
         self.walkers = []
         console.log('No socket data')
       }
    })
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
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        self.isMapReady = true
      }
    )

    // move map to actual position
    this._geolocation.getCurrentPosition().then(
      (res) => {

        let data = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
        self.map.setCameraTarget(data)

        self._globalProvider.geolocation.latitude = res.coords.latitude
        self._globalProvider.geolocation.longitude = res.coords.longitude
      }
    )

  }


  watchGeolocation() {
    let self = this
    let watch = this._geolocation.watchPosition()
    let profile = JSON.parse(this._globalProvider.getStorage('profile'))

    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     self._globalProvider.geolocation.latitude = data.coords.latitude
     self._globalProvider.geolocation.longitude = data.coords.longitude

     self._socket.emit('set-nickname', {
       idsocket: self._socket.ioSocket.id,
       id: profile.user_id,
       name: profile.name,
       latitude:  self._globalProvider.geolocation.latitude,
       longitude:  self._globalProvider.geolocation.longitude
     })

    })

  }


  updateMakers() {
    let self = this

    this.map.clear()


    for(let i = 0; i < this.walkers.length; i++) {

      let marker = {
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: this.walkers[i].latitude,
          lng: this.walkers[i].longitude,
        }
      }

      // Now you can use all methods safely.
      this.map.addMarker(marker).then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

          let data = {
            id: this.walkers[i].iduser,
            name: this.walkers[i].name,
          }

          self.userPreview(data)

        })
      })

    }
  }


  userPreview(data) {

    console.log('data received: ', data)

    let modal = this.modalCtrl.create(UserPreviewPage)
        modal.present()
  }

}
