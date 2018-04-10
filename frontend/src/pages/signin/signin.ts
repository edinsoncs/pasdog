import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// providers
import { GlobalProvider } from '../../providers/global/global';
import { UserProvider } from '../../providers/user/user';

// pages
import { MapPage } from '../map/map';
import { SignupUserTypePage } from '../signup-user-type/signup-user-type';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {

  form: any
  isFormLoaded: boolean = false
  isGeolocated: boolean = false
  isGeocoder: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _userProvider: UserProvider,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
    this.isFormLoaded = true
  }


  signin() {
    if(this.form.valid) {

      this.form.patchValue({
        email: this.form.value.email.toLowerCase()
      })

      let form = this.form,
          loading = this.loadingCtrl.create({
        content: 'Cargando...'
      })
      loading.present()

      this._userProvider.login(form.value).subscribe(
        (response: any) => {
          loading.dismiss()

          let profile = {
            email: response.email,
            name: response.name,
            city: response.city,
            user_id: response.user_id,
            user_type: response.user_type
          }
          let token = response.token

          this._globalProvider.setStorage('profile', JSON.stringify(profile))
          this._globalProvider.setStorage('token', token)

          if(profile.user_type != null)
            this.navCtrl.setRoot(MapPage)

          else
            this.navCtrl.setRoot(SignupUserTypePage)
        },
        (error) => {
          loading.dismiss()
          this._globalProvider.toast('Usuario o contraseña incorrectos')
        }
      )
    }

  }

}
