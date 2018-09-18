import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import * as moment from 'moment'

// pages
import { ChatPage } from '../chat/chat'

// services
import { GlobalProvider } from '../../providers/global/global'
import { ContractProvider } from '../../providers/contract/contract'


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
    public globalProvider: GlobalProvider,
    private _contractProvider: ContractProvider
  ) { }

  ionViewDidLoad() {
    this.tab = 'tab1'
    this.id = this.navParams.get('id')
    this.payload = this.navParams.get('payload')
    this.getContract()
    this.getContractDogs()
  }

  getContract() {
    this.file = this.payload.walker.avatar
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


  openPage(page) {
    switch(page) {
      case 'chat':

        const payload = {
          id: this.id,
          walker: this.walker
        }

        this.navCtrl.push(ChatPage, payload)
        break
    }
  }

}
