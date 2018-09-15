import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'


@Component({
  selector: 'page-user-comments',
  templateUrl: 'user-comments.html',
})

export class UserCommentsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCommentsPage')
  }

}
