import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'

// pages
import { PetAddPage } from '../pet-add/pet-add'

// providers
import { PetProvider } from '../../providers/pet/pet'
import { GlobalProvider } from '../../providers/global/global'


@Component({
  selector: 'page-pet-profile',
  templateUrl: 'pet-profile.html',
})

export class PetProfilePage {

  id: number
  size: number
  age: number
  weight: number
  name: string
  race: string
  avatar: string
  details: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public globalProvider: GlobalProvider,
    private _petProvider: PetProvider
  ) { }


  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.size = this.navParams.get('size')
    this.age = this.navParams.get('age')
    this.weight = this.navParams.get('weight')
    this.name = this.navParams.get('name')
    this.race = this.navParams.get('race')
    this.avatar = this.navParams.get('avatar')
    this.details = this.navParams.get('details')

    this.update()
  }


  update() {
    this._petProvider.getPetById({dogid: this.id}).subscribe(
      (response: any) => {
        if(response) {
          this.id = response.id
          this.size = response.size
          this.age = response.age
          this.weight = response.body
          this.name = response.name
          this.race = response.race
          this.avatar = this.globalProvider.galleryDogsUrl + '/' + response.avatar
          this.details = response.details
        }
      },
      (error) => {

      }
    )
  }


  openPage(page) {
    switch(page) {
      case 'pet-edit':
        const payload = {
          dogid: this.id,
          name: this.name,
          size: this.size,
          age: this.age,
          weight: this.weight,
          race: this.race,
          avatar: this.avatar,
        }
        this.navCtrl.push(PetAddPage, {formEdit: payload})
        break
      case 'pet-delete':
        this._petProvider.deletePet({dogid: this.id}).subscribe(
          (response: any) => {
            console.log('pet-delete', response)
          }
        )
        break
    }
  }

}
