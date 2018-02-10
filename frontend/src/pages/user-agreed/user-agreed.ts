import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// pages
import { PaymentSelectPage } from '../payment-select/payment-select';


@Component({
  selector: 'page-user-agreed',
  templateUrl: 'user-agreed.html',
})
export class UserAgreedPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAgreedPage');
  }

  pay() {
    this.navCtrl.push(PaymentSelectPage)
  }

}
