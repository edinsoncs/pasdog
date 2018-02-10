import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-user-configuration',
  templateUrl: 'user-configuration.html',
})

export class UserConfigurationPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserConfigurationPage');
  }

}
