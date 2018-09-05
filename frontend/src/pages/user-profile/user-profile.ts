import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular'

// pages
import { AgreePage } from '../agree/agree'
import { PetsListModalPage } from '../pets-list-modal/pets-list-modal'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { ContractProvider } from '../../providers/contract/contract'


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})

export class UserProfilePage {

  tab: string = "tab1"

  id: number
  name: string
  thumbnail: string = this._globalProvider.emptyProfile
  price: number
  reputation: number
  city: string
  role: number
  description: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private _globalProvider: GlobalProvider,
    private _contractProvider: ContractProvider
  ) { }

  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.name = this.navParams.get('name')
    this.thumbnail = this.navParams.get('thumbnail')
    this.price = this.navParams.get('price')
    this.reputation = this.navParams.get('reputation')
    this.city = this.navParams.get('city')
    this.role = this.navParams.get('role')
    this.description = this.navParams.get('description')
  }

  preAgree() {
    const self = this,
          modal = this.modalCtrl.create(PetsListModalPage, {}, {cssClass: 'custom-modal'})

    modal.present()

    modal.onDidDismiss((params) => {
      if(params)
        self.agree(params)
    })
  }


  agree(data) {
    const isOnline = this._globalProvider.isOnline(true),
          loading = this.loadingCtrl.create({
            content: 'Cargando...'
          })

    loading.present()

    const payload = {
      pas_id: this.id,
      dog_ids: data.petsChecked,
      exclusive: data.exclusive
    }

    if(isOnline)
      this._contractProvider.newContract(payload).subscribe(
        (response: any) => {

          // create
          // dog_ids
          // pas_id
          // status
          // user_id
          loading.dismiss()

          if(response.create) {
            this.navCtrl.setRoot(AgreePage, {name: this.name, walkerId: this.id, contractId: response._id})
          }

          else
            this._globalProvider.toast('Ocurrió un problema al crear el contrato')

        },
        (error) => {
          loading.dismiss()
          this._globalProvider.toast('Ocurrió un problema al crear el contrato. Por favor intentalo nuevamente')
        }
      )
  }

}
