import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'


@Component({
  selector: 'page-pet-profile',
  templateUrl: 'pet-profile.html',
})

export class PetProfilePage {

  id: number
  size: number
  age: number
  weight: number = 8
  name: string
  race: string
  avatar: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.size = this.navParams.get('size')
    this.age = this.navParams.get('age')
    this.weight = this.navParams.get('weight')
    this.name = this.navParams.get('name')
    this.race = this.navParams.get('race')
    this.avatar = this.navParams.get('avatar')
  }

}
