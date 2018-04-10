import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

// pages
import { PetAddPage } from '../pet-add/pet-add'

// providers
import { PetProvider } from '../../providers/pet/pet'


@Component({
  selector: 'page-pets',
  templateUrl: 'pets.html',
})

export class PetsPage {

  pets: any = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _petProvider: PetProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetsPage')
    this.getPet()
  }

  getPet() {
    this._petProvider.getPet().subscribe(
      (response) => {
        this.pets = []

        console.log('pets', response)
      }
    )
  }

  add() {
    this.navCtrl.push(PetAddPage)
  }

}
