import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

// pages
import { PetAddPage } from '../pet-add/pet-add'


@Component({
  selector: 'page-pets',
  templateUrl: 'pets.html',
})

export class PetsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetsPage')
  }

  add() {
    this.navCtrl.push(PetAddPage)
  }

}
