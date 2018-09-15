import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'


@Component({
  selector: 'page-contract-detail',
  templateUrl: 'contract-detail.html',
})

export class ContractDetailPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContractDetailPage')
  }

}
