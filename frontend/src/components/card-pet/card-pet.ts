import { Component, Input } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

// pages
import { PetProfilePage } from '../../pages/pet-profile/pet-profile'


@Component({
  selector: 'card-pet',
  templateUrl: 'card-pet.html'
})

export class CardPetComponent {

  @Input('id') id: number
  @Input('size') size: number
  @Input('age') age: number
  @Input('name') name: string
  @Input('weight') weight: number
  @Input('race') race: string
  @Input('avatar') avatar: string = "image.png"
  @Input('details') details: string

  constructor(
    public navCtrl: NavController
  ) { }

  openProfile() {
    let data = {
      id: this.id,
      size: this.size,
      age: this.age,
      name: this.name,
      weight: this.weight,
      race: this.race,
      avatar: this.avatar,
      details: this.details
    }

    this.navCtrl.push(PetProfilePage, data)
  }

}
