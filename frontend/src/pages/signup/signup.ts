import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// plugins
import { NativeGeocoder, /*NativeGeocoderReverseResult*/ } from '@ionic-native/native-geocoder';

// providers
import { GlobalProvider } from '../../providers/global/global';
import { UserProvider } from '../../providers/user/user';

// pages
import { MapPage } from '../map/map';
import { SignupUserTypePage } from '../signup-user-type/signup-user-type';


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
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {

    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'country': new FormControl('Argentina', Validators.required),
      'province': new FormControl('CABA', Validators.required),
      'city': new FormControl('San Nicolás', Validators.required),
      'geolocation': new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
      ])
    })
    this.isFormLoaded = true

    let geolocation = this._globalProvider.geolocation
    this.geocoder(geolocation.latitude, geolocation.longitude)
  }


  geocoder(latitude: number, longitude: number) {
    let self = this

    this._nativeGeocoder.reverseGeocode(latitude, longitude).then(
      (response: any) => {
        // console.log('geocoder:', JSON.stringify(result))

        this.form.patchValue({
          country: response.countryName,
          province: response.administrativeArea,
          city: response.subAdministrativeArea,
          geolocation: [latitude, longitude]
        })

        this.isGeolocated = true
      }
    )
    .catch(
      (error: any) => {
        console.log(error)
        this.isGeolocated = true
        this.form.patchValue({
          geolocation: [latitude, longitude]
        })
      }
    )

  }


  signup(geolocating?) {

    let self = this

    if(geolocating) {
      if(this.isGeolocated)
        this.signup()

      else {
        let loading = this.loadingCtrl.create({
          content: 'Localizando...'
        })
        loading.present()

        setTimeout(() => {
          self.signup(true)
          loading.dismiss()
        }, 500)
      }
    }

    else{

      if(!this.isGeolocated) {
        let loading = this.loadingCtrl.create({
          content: 'Localizando...'
        })
        loading.present()

        setTimeout(() => {
          self.signup(true)
          loading.dismiss()
        }, 500)
      }

      else{

        let loading = this.loadingCtrl.create({
          content: 'Cargando...'
        })
        loading.present()

        if(this.form.valid) {

          this.form.patchValue({
            email: this.form.value.email.toLowerCase()
          })

          let form = this.form

          this._userProvider.setUser(form.value).subscribe(
            (response: any) => {
              loading.dismiss()

              if(response.status == 0) {
                let message = response.message ? response.message : 'Ocurrió un problema al registrarte'
                this._globalProvider.toast(message)
              }

              else {
                let profile = {
                  city: response.city,
                  email: response.email,
                  geolocation: response.geolocation.length > 1 ? response.geolocation : null,
                  name: response.name,
                  avatar: response.avatar,
                  user_id: response.user_id,
                  user_type: null
                }

                this._globalProvider.setStorage('token', response.token)
                this._globalProvider.setStorage('profile', JSON.stringify(profile))
                this._globalProvider.profile = profile

                this.navCtrl.setRoot(SignupUserTypePage)
              }

            },
            (error) => {
              loading.dismiss()
            }
          )
        }

      }
    }
  }

}
