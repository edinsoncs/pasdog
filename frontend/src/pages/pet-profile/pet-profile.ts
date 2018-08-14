import { Component } from '@angular/core'
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular'

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
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public globalProvider: GlobalProvider,
    private _petProvider: PetProvider
  ) { }


  ionViewDidEnter() {
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
          this.id = response._id
          this.size = response.size
          this.age = response.age
          this.weight = response.body
          this.name = response.name
          this.race = response.race
          this.avatar = response.avatar ? (this.globalProvider.galleryDogsUrl + '/' + response.avatar) : this.globalProvider.emptyProfile
          this.details = response.details
        }
      },
      (error) => {

      }
    )
  }


  openPage(page, confirm?) {
    const self = this

    switch(page) {
      case 'pet-edit':
        const payload = {
          dogid: this.id,
          name: this.name,
          size: this.size,
          age: this.age,
          weight: this.weight,
          race: this.race,
          description: this.details
        }
        this.navCtrl.push(PetAddPage, {formEdit: payload})
        break

      case 'pet-delete':
        if(confirm) {
          const isOnline = this.globalProvider.isOnline(true),
                loading = this.loadingCtrl.create()

          if(isOnline) {
            loading.present()

            this._petProvider.deletePet({dogid: this.id}).subscribe(
              (response: any) => {

                // remove pet from storage pet list
                let oldPets: any = this.globalProvider.getStorage('pets'),
                    newPets: any = []

                if(oldPets) {
                  oldPets = JSON.parse(oldPets)
                  oldPets.map((pet, index) => {
                    if(pet._id != this.id)
                      newPets.push(pet)
                  })
                  this.globalProvider.setStorage('pets', JSON.stringify(newPets))
                }

                this.globalProvider.toast(`${ this.name } fue eliminado de tu lista`)
                loading.dismiss()
                this.navCtrl.pop()
              },
              (error) => {
                this.globalProvider.toast(`${ this.name } no pudo eliminarse de tu lista`)
                loading.dismiss()
              }
            )
          }
        }

        else {
          const alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: `¿Deseas eliminar a <strong>${ this.name }</strong> de tu lista de mascotas?`,
            buttons: [
              'No',
              {
                text: 'Eliminar',
                handler: () => self.openPage('pet-delete', true)
              }
            ]
          })
          alert.present()
        }
        break

      case 'options':
        const options = this.actionSheetCtrl.create({
          title: 'Más opciones',
          buttons: [
            {
              text: 'Editar información',
              handler: () => self.openPage('pet-edit')
            },{
              text: 'Eliminar',
              role: 'destructive',
              handler: () => self.openPage('pet-delete')
            }
          ]
        })
        options.present()
        break
    }
  }

}
