import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// pages
import { AgreePage } from '../agree/agree';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})

export class UserProfilePage {

  tab: string = "tab1"

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
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
      }, 1000
    )
  }

}
