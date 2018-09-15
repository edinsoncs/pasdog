import { Component } from '@angular/core'
import { NavController, NavParams, Events } from 'ionic-angular'

// pages
import { ListHistoryPage } from '../list-history/list-history'


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
    public events: Events
  ) { }

  ionViewDidLoad() {
    this.name = this.navParams.get('name')
    this.walkerId = this.navParams.get('walkerId')
    this.contractId = this.navParams.get('contractId')
  }

  openPage(page) {
    switch(page) {
      case 'chat':
        // this.navCtrl.setRoot(ChatPage, {id: this.contractId })
        break
      case 'list-agreed':
        this.navCtrl.pop()
        // this.navCtrl.setRoot(ListHistoryPage)
        this.events.publish('nav', {page: 'list-history'})
        break
    }
  }

}
