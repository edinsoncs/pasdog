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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private _googleMaps: GoogleMaps,
    private _geolocation: Geolocation,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {
   this.loadMap();
  }

  loadMap(latitude?: number, longitude?: number) {

    let self = this

    if(!latitude && !longitude){
      this.geolocation();
    }

    else{
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
      };

      this.map = GoogleMaps.create('map', mapOptions);

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY).then(
        () => {
          console.log('Map is ready!');

          // Now you can use all methods safely.
          this.map.addMarker({
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: -34.608682,
                lng: -58.3764658
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  self.userPreview()
                });
            });

        }
      );

    }
  }


  geolocation() {

    this._geolocation.getCurrentPosition().then(
      (res) => {
        this.loadMap(res.coords.latitude, res.coords.longitude)
      }
    ).catch(
      (error) => {
        console.log('Error getting location', error);
        this.loadMap(this._globalProvider.defaultLatitude, this._globalProvider.defaultLongitude);
      }
    );
  }


  userPreview() {
    let modal = this.modalCtrl.create(UserPreviewPage)
        modal.present()
  }

}
