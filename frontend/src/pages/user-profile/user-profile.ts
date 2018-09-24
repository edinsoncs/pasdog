import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

// providers
import { GlobalProvider } from '../../providers/global/global'


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})

export class UserProfilePage {

  tab: string = "tab1"

  id: number
  name: string
  thumbnail: string = this._globalProvider.emptyProfile
  price: number
  reputation: number
  city: string
  role: number
  description: string
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.name = this.navParams.get('name')
    this.thumbnail = this.navParams.get('thumbnail')
    this.role = this.navParams.get('role')
  }

}
