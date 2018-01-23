import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

// pages
import { UserProfilePage } from '../user-profile/user-profile';


@Component({
  selector: 'page-user-preview',
  templateUrl: 'user-preview.html',
})

export class UserPreviewPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPreviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openProfile() {
    //this.dismiss();
    this.navCtrl.push(UserProfilePage);
  }
}
