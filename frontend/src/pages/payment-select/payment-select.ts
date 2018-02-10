import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-payment-select',
  templateUrl: 'payment-select.html',
})
export class PaymentSelectPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSelectPage');
  }

  pay(type) {
    this.navCtrl.pop();
  }
}
