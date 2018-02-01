import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { UserAgreedPage } from '../user-agreed/user-agreed';


@Component({
  selector: 'page-agree',
  templateUrl: 'agree.html',
})

export class AgreePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreePage');
  }

  openPage(page) {
    switch(page) {
      case 'user-agreed':
        this.navCtrl.push(UserAgreedPage);
        break;
    }
  }

}
