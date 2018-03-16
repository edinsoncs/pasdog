import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

// pages
import { UserProfilePage } from '../user-profile/user-profile';


@Component({
  selector: 'page-user-preview',
  templateUrl: 'user-preview.html',
})

export class UserPreviewPage {

  id: number
  name: string
  avatar: string
  price: number
  reputation: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPreviewPage');
    this.id = this.navParams.get('id')
    this.name = this.navParams.get('name')
    this.avatar = this.navParams.get('avatar')
    this.price = this.navParams.get('price')
    this.reputation = this.navParams.get('reputation')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openProfile() {
    //this.dismiss();
    this.navCtrl.push(UserProfilePage);
  }
}
