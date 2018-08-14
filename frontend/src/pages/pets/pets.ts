import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

// pages
import { PetAddPage } from '../pet-add/pet-add'

// providers
import { GlobalProvider } from '../../providers/global/global'
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
    public globalProvider: GlobalProvider,
    private _petProvider: PetProvider
  ) { }

  ionViewDidEnter() {
    this.getPet()
  }

  getPet() {
    const pets = this.globalProvider.getStorage('pets'),
          isOnline = this.globalProvider.isOnline(true)

    if(pets)
      this.pets = JSON.parse(pets)

    if(isOnline)
      this._petProvider.getPet().subscribe(
        (response: any) => {
          this.pets = []

          if(response.list) {
            this.pets = response.list
            this.globalProvider.setStorage('pets', JSON.stringify(this.pets))
          }

        }
      )
  }

  add() {
    this.navCtrl.push(PetAddPage)
  }

}
