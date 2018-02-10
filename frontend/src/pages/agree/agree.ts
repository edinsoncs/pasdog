import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { ListAgreedPage } from '../list-agreed/list-agreed';


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
      case 'list-agreed':
        this.navCtrl.setRoot(ListAgreedPage);
        break;
    }
  }

}
