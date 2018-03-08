import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'

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
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }


  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loading.present()

    let token = this._globalProvider.getStorage('token')
    if(token){

      this._userProvider.getProfile().subscribe(
        (response: any) => {
          loading.dismiss()

          if(response.user_id) {
            this._globalProvider.setStorage('profile', JSON.stringify(response))

            if(response.user_type != null)
              this.navCtrl.setRoot(MapPage)

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

    else{

      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      })
      loading.present();

      setTimeout(() => {
        self.navCtrl.setRoot(MapPage);
        loading.dismiss();
      }, 700)
    }

  }


  signup() {
    this.navCtrl.push(SignupPage)
  }

}
