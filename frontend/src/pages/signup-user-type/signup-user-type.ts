import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

// pages
import { MapPage } from '../map/map';


@Component({
  selector: 'page-signup-user-type',
  templateUrl: 'signup-user-type.html',
})

export class SignupUserTypePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupUserTypePage');
  }

  setUserType(type) {
    let self = this;

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      self.navCtrl.setRoot(MapPage);
    }, 1000)
  }

}
