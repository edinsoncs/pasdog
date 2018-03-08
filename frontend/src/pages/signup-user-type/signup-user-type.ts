import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// pages
import { MapPage } from '../map/map';

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-signup-user-type',
  templateUrl: 'signup-user-type.html',
})

export class SignupUserTypePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  setUserType(type) {
    let self = this;

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    let data = {
      type: type
    }

    this._userProvider.setUserType(data).subscribe(
      (response: any) => {
        loading.dismiss()

        let profile: any = this._globalProvider.getStorage('profile')
            profile = JSON.parse(profile)
            profile.user_type = response.role

        this._globalProvider.setStorage('profile', JSON.stringify(profile))
        self.navCtrl.setRoot(MapPage)
      }
    )
  }

}
