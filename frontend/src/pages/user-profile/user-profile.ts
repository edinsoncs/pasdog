import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

// pages
import { AgreePage } from '../agree/agree'

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
  avatar: string
  thumbnail: string = this._globalProvider.emptyProfile
  price: number
  reputation: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _globalProvider: GlobalProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.name = this.navParams.get('name')
    this.avatar = this.navParams.get('avatar')
    this.thumbnail = this.navParams.get('thumbnail')
    this.price = this.navParams.get('price')
    this.reputation = this.navParams.get('reputation')

    if(!this.thumbnail)
      this.thumbnail = `${ this._globalProvider.galleryUrl }/${ this.avatar }?q=${ this._globalProvider.getStorage('token') }`
  }

  agree() {
    let self = this

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loading.present()

    setTimeout(
      () => {
        self.navCtrl.push(AgreePage)
        loading.dismiss()
      }, 1000
    )
  }

}
