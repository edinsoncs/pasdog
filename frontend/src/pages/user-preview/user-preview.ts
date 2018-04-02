import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

// pages
import { UserProfilePage } from '../user-profile/user-profile'

// providers
import { GlobalProvider } from '../../providers/global/global'


@Component({
  selector: 'page-user-preview',
  templateUrl: 'user-preview.html',
})

export class UserPreviewPage {

  id: number
  name: string
  avatar: string
  thumbnail: string = this._globalProvider.emptyProfile
  price: number
  reputation: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.name = this.navParams.get('name')
    this.avatar = this.navParams.get('avatar')
    this.price = this.navParams.get('price')
    this.reputation = 3 // FIXME: this.navParams.get('reputation')

    if(this.avatar)
      this.thumbnail = `${ this._globalProvider.galleryUrl }/${ this.avatar }?q=${ this._globalProvider.getStorage('token') }`
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openProfile() {
    let data = {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      thumbnail: this.thumbnail,
      price: this.price,
      reputation: this.reputation
    }
    //this.dismiss();
    this.navCtrl.push(UserProfilePage);
  }
}
