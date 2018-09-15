import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';

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
    public menuCtrl: MenuController,
    private _userProvider: UserProvider,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {
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
            avatar: response.avatar,
            user_id: response.user_id,
            user_type: response.user_type,
            price: response.price,
            description: response.description
          }
          let token = response.token

          this._globalProvider.setStorage('profile', JSON.stringify(profile))
          this._globalProvider.setStorage('token', token)
          this._globalProvider.profile = profile

          if(profile.avatar)
            this._globalProvider.thumbnail = this._globalProvider.galleryUrl + '/' + profile.avatar

          if(profile.user_type != null) {
            this.navCtrl.setRoot(MapPage)
            this.menuCtrl.enable(true)
          }

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
