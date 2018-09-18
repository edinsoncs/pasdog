import { Component } from '@angular/core'
import { NavController, NavParams, Events } from 'ionic-angular'

// providers
import { ContractProvider } from '../../providers/contract/contract'


@Component({
  selector: 'page-agree',
  templateUrl: 'agree.html',
})

export class AgreePage {

  name: string
  walkerId: string
  contractId: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private _contractProvider: ContractProvider
  ) { }

  ionViewDidLoad() {
    this.name = this.navParams.get('name')
    this.walkerId = this.navParams.get('walkerId')
    this.contractId = this.navParams.get('contractId')
  }

  openPage(page) {
    this.navCtrl.pop()

    switch(page) {
      case 'chat':
        const payload = {id: this.contractId, walkerId: this.walkerId}
        this.events.publish('nav', {page: 'chat', payload: payload})
        break
      case 'list-agreed':
        this.events.publish('nav', {page: 'list-history'})
        break
    }
  }

}
