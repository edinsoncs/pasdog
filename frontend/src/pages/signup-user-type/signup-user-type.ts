import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular'

// pages
import { MapPage } from '../map/map'
import { UserWalkerCompletePage } from '../user-walker-complete/user-walker-complete'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-signup-user-type',
  templateUrl: 'signup-user-type.html',
})

export class SignupUserTypePage {

  name: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    let profile: any = this._globalProvider.getStorage('profile')
        profile = JSON.parse(profile)

    this.name = profile.name
  }

  setUserType(type) {
    let loading = this.loadingCtrl.create({
          content: 'Cargando...'
        }),
        data = {
          type: type
        }

    if(type == 1) {
      this.navCtrl.push(UserWalkerCompletePage)
    }

    else {
      loading.present()

      this._userProvider.setUserType(data).subscribe(
        (response: any) => {
          loading.dismiss()

          let profile: any = this._globalProvider.getStorage('profile')
              profile = JSON.parse(profile)
              profile.user_type = response.role

          this._globalProvider.setStorage('profile', JSON.stringify(profile))
          this.navCtrl.setRoot(MapPage)
          this.menuCtrl.enable(false)
        },
        (error) => {
          loading.dismiss()
        }
      )
    }

  }

}
