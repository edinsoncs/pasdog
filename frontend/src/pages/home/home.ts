import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

// pages
import { SignupPage } from '../signup/signup';
import { MapPage } from '../map/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) { }


  login() {
    let self = this

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loading.present();

    setTimeout(() => {
      self.navCtrl.setRoot(MapPage);
      loading.dismiss();
    }, 700)
  }

  signup() {
    this.navCtrl.push(SignupPage)
  }

}
