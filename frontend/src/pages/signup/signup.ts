import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// plugins
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  form: any
  isFormLoaded: boolean = false
  isGeolocated: boolean = false
  isGeocoder: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _nativeGeocoder: NativeGeocoder,
    private _geolocation: Geolocation,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'country': new FormControl('argentina', Validators.required),
      'province': new FormControl('CABA'),
      'city': new FormControl('San Nicolás')
    })
    this.isFormLoaded = true

    this.geolocation();
  }


  geolocation() {

    this._geolocation.getCurrentPosition().then(
      (res) => {
        this.geocoder(res.coords.latitude, res.coords.longitude)
      }
    ).catch(
      (error) => {
        console.log('Error getting location', error);
        this.geocoder(this._globalProvider.defaultLatitude, this._globalProvider.defaultLongitude);
      }
    );
  }


  geocoder(latitude?: number, longitude?: number) {
    let self = this

    if(!latitude && !longitude){
      this.geolocation();
    }

    else{

      this._nativeGeocoder.reverseGeocode(latitude, longitude).then(
        (result: NativeGeocoderReverseResult) => console.log('geocoder:', JSON.stringify(result))
      )
      .catch(
        (error: any) => console.log(error)
      );

    }
  }


  signup() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    if(this.form.valid) {
      let form = this.form.value

      console.log('signup data:', this.form.value)
      this._userProvider.setUser(form).subscribe(
        (response) => {
          alert('response!')
          alert(response)
          console.log(response)
        }
      )
    }
  }

}
