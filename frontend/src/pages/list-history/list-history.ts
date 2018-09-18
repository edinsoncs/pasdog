import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import * as moment from 'moment'

// pages
import { ContractDetailPage } from '../contract-detail/contract-detail'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { ContractProvider } from '../../providers/contract/contract'


@Component({
  selector: 'page-list-history',
  templateUrl: 'list-history.html',
})

export class ListHistoryPage {

  contracts: any
  userType: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public globalProvider: GlobalProvider,
    private _contractProvider: ContractProvider
  ) { }

  ionViewDidLoad() {
    this.getContracts()
    this.userType = this.globalProvider.role
  }


  getContracts() {
    const isOnline = this.globalProvider.isOnline(true),
          contracts = this.globalProvider.getStorage('contracts')

    if(contracts)
      this.contracts = JSON.parse(contracts)

    if(isOnline)
      this._contractProvider.getContract().subscribe(
        (response: any) => {

          this.contracts = []
          if(response && response.length) {
            this.contracts = response


            const actualDate = moment(new Date()).format('YYYY-MM-DD')
            let prevDate = null

            this.contracts.map((contract, i) => {

              // set actual date in visible format
              const date = (contract.create).substring(0, 10)
              this.contracts[i].visible_date = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')

              this.contracts[i].walker = {
                avatar: contract.pas_id[0].avatar ? this.globalProvider.galleryUrl + '/' + contract.pas_id[0].avatar : this.globalProvider.emptyProfile,
                name: contract.pas_id[0].name
              }

              if(prevDate != date) {
                prevDate = date
                this.contracts[i].showDate = true
                const diff = Math.abs(moment(date, 'YYYY-MM-DD').diff(actualDate, 'days'))

                if(diff == 0)
                  this.contracts[i].visible_date = 'hoy'

                else if(diff == 1)
                  this.contracts[i].visible_date = 'hace 1 día'

                else if(diff > 1 && diff < 21) {
                  if(diff == 7)
                    this.contracts[i].visible_date = 'hace 1 semana'
                  else
                    this.contracts[i].visible_date = `hace ${ diff } días`
                }

              }

            })

            this.globalProvider.setStorage('contracts', JSON.stringify(this.contracts))
          }

        },
        (error) => {

          console.log('err', error)
        }
      )
  }


  openPage(page, payload?) {
    console.log(payload)
    switch(page) {
      case 'contract-detail':
        this.navCtrl.push(ContractDetailPage, {id: payload._id, payload: payload})
        break

    }
  }

}
