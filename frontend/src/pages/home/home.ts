import { Component } from '@angular/core'
import { NavController, LoadingController, MenuController } from 'ionic-angular'

// pages
import { SignupPage } from '../signup/signup'
import { SignupUserTypePage } from '../signup-user-type/signup-user-type';
import { SigninPage } from '../signin/signin'
import { MapPage } from '../map/map'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }


  ionViewDidLoad() {
    this.menuCtrl.enable(false)

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loading.present()

    let token = this._globalProvider.getStorage('token')
    if(token){

      this._userProvider.getProfile().subscribe(
        (response: any) => {
          loading.dismiss()

          response = response[0].data

          if(response.user_id) {
            this._globalProvider.setStorage('profile', JSON.stringify(response))
            this._globalProvider.profile = response
            this._globalProvider.role = response.user_type

            if(response.avatar)
              this._globalProvider.thumbnail = this._globalProvider.galleryUrl + '/' + response.avatar

            if(response.user_type != null) {
              this.navCtrl.setRoot(MapPage)
              this.menuCtrl.enable(true)
            }

            else
              this.navCtrl.setRoot(SignupUserTypePage)
          }
        },
        (error) => loading.dismiss()
      )

    }

    else
      loading.dismiss()
  }


  login(type) {
    let self = this

    if(type == 'email'){
      self.navCtrl.push(SigninPage);
    }
  }


  signup() {
    this.navCtrl.push(SignupPage)
  }

}
