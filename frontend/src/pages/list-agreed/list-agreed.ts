import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { UserAgreedPage } from '../user-agreed/user-agreed';


@Component({
  selector: 'page-list-agreed',
  templateUrl: 'list-agreed.html',
})

export class ListAgreedPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAgreedPage');
  }

  openPage() {
    this.navCtrl.push(UserAgreedPage);
  }

}
