import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: GoogleMap
  defaultLatitude: -34.6036845
  defaultLongitude: -58.3816649

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _googleMaps: GoogleMaps,
    private _geolocation: Geolocation
  ) { }

  ionViewDidLoad() {
   this.loadMap();
  }

  loadMap(latitude?: number, longitude?: number) {

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
              title: 'Ionic',
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: latitude+200,
                lng: latitude-200
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  alert('clicked');
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
        this.loadMap(this.defaultLatitude, this.defaultLongitude);
      }
    );
  }

}
