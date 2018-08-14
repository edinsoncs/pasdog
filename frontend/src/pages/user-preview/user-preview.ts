import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

// pages
import { UserProfilePage } from '../user-profile/user-profile'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-user-preview',
  templateUrl: 'user-preview.html',
})

export class UserPreviewPage {

  id: number
  name: string
  avatar: string
  thumbnail: string = this._globalProvider.emptyProfile
  city: string
  price: number
  reputation: number
  role: number
  description: string

  isLoadingProfile: boolean = true

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _globalProvider: GlobalProvider,
    private _userProvdier: UserProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.name = this.navParams.get('name')
    this.avatar = this.navParams.get('avatar')
    this.price = 0
    this.reputation = 0
    this.role = null
    this.description = null

    if(this.avatar)
      this.thumbnail = `${ this._globalProvider.galleryUrl }/${ this.avatar }?q=${ this._globalProvider.getStorage('token') }`

    this.getProfileById()
  }


  getProfileById() {
    const isOnline = this._globalProvider.isOnline(true)
    if(isOnline) {
      this._userProvdier.getProfileById({id: this.id}).subscribe(
        (response: any) => {

          this.isLoadingProfile = false

          if(response) {
            // this.id
            // this.name
            // this.avatar
            this.city = response.city
            this.price = Number(response.price)
            this.reputation = 4 // FIXME: hardcoded!!
            this.role = response.role
            this.description = response.description
          }

        },
        (error) => {

        }
      )
    }

    else
      this.isLoadingProfile = false

  }


  dismiss() {
    this.viewCtrl.dismiss()
  }


  openProfile() {
    let data = {
      id: this.id,
      name: this.name,
      thumbnail: this.thumbnail,
      price: this.price,
      reputation: this.reputation,
      city: this.city,
      role: this.role,
      description: this.description
    }
    //this.dismiss();
    this.navCtrl.push(UserProfilePage, data)
  }
}
