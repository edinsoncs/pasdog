import { Component } from '@angular/core'
import { NavController, NavParams, ViewController } from 'ionic-angular'

// pages
import { PetAddPage } from '../pet-add/pet-add'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { PetProvider } from '../../providers/pet/pet'


@Component({
  selector: 'page-pets-list-modal',
  templateUrl: 'pets-list-modal.html',
})

export class PetsListModalPage {

  step: number = 1
  isPageLoading: boolean = true
  pets: any = null
  petsChecked: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public globalProvider: GlobalProvider,
    private _petProvider: PetProvider
  ) { }

  ionViewDidLoad() {
    this.petsChecked = []
  }

  ionViewDidEnter() {
    this.getPet()
    this.isPageLoading = false
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

            this.pets.map((pet, i) => {
              if(pet.avatar)
                this.pets[i].path = this.globalProvider.galleryDogsUrl + '/' + pet.avatar
            })
          }

        }
      )
  }


  add() {
    this.navCtrl.push(PetAddPage, {preventRoot: true})
  }


  dismiss() {
    this.viewCtrl.dismiss()
  }


  nextStep() {
    const pets = this.pets,
          petsChecked = []

    if(pets.length)
      pets.map((pet, i) => {
        if(pet.check)
          petsChecked.push(pet._id)
      })

    if(!petsChecked.length)
      this.globalProvider.toast('Debes agregar al menos a una mascota a tu paseo')

    else {
      this.petsChecked = petsChecked
      this.step = 2
    }
  }


  agree(exclusive) {
    const payload = {
      exclusive: exclusive,
      petsChecked: this.petsChecked
    }

    this.viewCtrl.dismiss(payload)
  }

}
