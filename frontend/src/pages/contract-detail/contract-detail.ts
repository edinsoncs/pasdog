import { Component } from '@angular/core'
import { NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular'
import * as moment from 'moment'

// pages
import { ChatPage } from '../chat/chat'
import { WalkerProfilePage } from '../walker-profile/walker-profile'
import { UserProfilePage } from '../user-profile/user-profile'

// services
import { GlobalProvider } from '../../providers/global/global'
import { ContractProvider } from '../../providers/contract/contract'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-contract-detail',
  templateUrl: 'contract-detail.html',
})

export class ContractDetailPage {

  id: string
  tab: string
  payload: any
  file: string
  pets: any = null
  walker: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public globalProvider: GlobalProvider,
    private _contractProvider: ContractProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    this.tab = 'tab1'
    this.id = this.navParams.get('id')
    this.payload = this.navParams.get('payload')
    this.getContract()
    this.getContractDogs()
  }

  getContract() {
    if(this.globalProvider.role == 0)
      this.file = this.payload.walker.avatar
    else
      this.file = this.payload.user.avatar

    this.walker = this.payload.pas_id[0]
    this.payload.contractDate = moment(this.payload.create).format('DD/MM/YYYY')
    this.payload.currency = 'AR$'
  }

  getContractDogs() {
    this._contractProvider.getContractPets({dogs: this.payload.dog_ids}).subscribe(
      (response: any) => {
        this.pets = []

        if(response && response.doc)
          this.pets = response.doc
      },
      (error) => {

      }
    )
  }


  openProfile() {
    const self = this,
          isOnline = self.globalProvider.isOnline(true),
          loading = self.loadingCtrl.create(),
          id = self.globalProvider.role == 1 ? self.payload.user.id : self.payload.walker.id


    if(isOnline) {
      loading.present()

      this._userProvider.getProfileById({
        id: id
      }).subscribe(

        (response: any) => {
          loading.dismiss()

          if(response) {
            const payload: any = {
              id: id,
              name: response.name,
              thumbnail: response.avatar ? self.globalProvider.galleryUrl + '/' + response.avatar : self.globalProvider.emptyProfile,
              role: response.role
            }

            if(self.globalProvider.role == 1)
              self.navCtrl.push(UserProfilePage, payload)

            else {
              payload.price = response.price
              payload.city = response.city
              payload.description = response.description

              self.navCtrl.push(WalkerProfilePage, payload)
            }

          }
        },

        (error) => {
          loading.dismiss()
          self.globalProvider.toast('Ocurrió un problema al obtener el perfil del usuario')
        }

      )
    }

  }


  openPage(page) {
    const self = this

    switch(page) {
      case 'chat':
        const payload = {
          id: this.id,
          walker: this.walker
        }

        if(this.payload.status == 0 || this.payload.status == 3) {
          if(this.payload.status == 0)
            this.alertCtrl.create({
              title: 'Atención',
              message: 'El paseo aún está pendiente. Recordá que tu paseador no verá lo que escribas acá hasta que lo apruebe',
              buttons: ['Ok']
            }).present()

          this.navCtrl.push(ChatPage, payload)
        }
        break

      case 'options':
        const options = this.actionSheetCtrl.create({
          title: 'Más opciones',
          buttons: [
            {
              text: 'Ver perfil',
              handler: () => self.openProfile()
            },
            {
              text: self.globalProvider.role == 1 ? 'Rechazar paseo' : 'Cancelar paseo',
              role: 'destructive',
              handler: () => this.changeStatus(4)
            }
          ]
        })
        options.present()
        break

    }
  }


  changeStatus(status, confirm?) {
    status = Number(status)

    const self = this,
          isOnline = this.globalProvider.isOnline(true),
          loading = this.loadingCtrl.create(),
          payload = {
            idcontract: this.id,
            status: status
          }

    if(status == 2)
      self.alertCtrl.create({
        title: '¡Felicitaciones!',
        message: 'Marcaste el paseo como finalizao ¡gran trabajo!'
      })

    if(status == 4 && !confirm) {
      const alert = this.alertCtrl.create({
        title: 'Atención',
        message: '¿Deseas cancelar el paseo? esta acción no se puede deshacer',
        buttons: [
          'No',
          {
            text: 'Si, cancelar',
            handler: () => self.changeStatus(4, true)
          }
        ]
      })
      alert.present()
    }

    else
      confirm = true


    if(isOnline)
      if(confirm) {
        loading.present()

        this._contractProvider.updateStatus(payload).subscribe(
          (response) => {

            loading.dismiss()

            if(status == 4)
              self.navCtrl.pop()

            else
              this.payload.status = status

          },
          (error) => {
            loading.dismiss()
            self.globalProvider.toast('Ocurrió un problema al modificar el estado del paseo')
          }
        )
      }

  }

}
