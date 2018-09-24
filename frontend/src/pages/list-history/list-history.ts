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

  tab: string = "tab1"
  userType: number

  contracts: any
  activeContracts: any = []
  inactiveContracts: any = []


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public globalProvider: GlobalProvider,
    private _contractProvider: ContractProvider
  ) { }

  ionViewDidEnter() {
    this.getContracts()
    this.userType = this.globalProvider.role
  }


  getContracts() {
    const isOnline = this.globalProvider.isOnline(true),
          contracts = this.globalProvider.getStorage('contracts')

    if(contracts) {
      this.contracts = JSON.parse(contracts)
      this.parseContracts(this.contracts)
    }

    if(isOnline)
      this._contractProvider.getContract().subscribe(
        (response: any) => {

          this.contracts = []
          if(response && response.length) {
            this.contracts = response


            const actualDate = moment(new Date()).format('YYYY-MM-DD')
            let prevDate = null,
                firstActive = false,
                firstInactive = false

            this.contracts.map((contract, i) => {
              let isFirstOfType: boolean = false

              // set actual date in visible format
              const date = (contract.create).substring(0, 10)
              this.contracts[i].visible_date = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')


              if(this.userType != 1)
                this.contracts[i].walker = {
                  avatar: contract.pas_id[0].avatar ? this.globalProvider.galleryUrl + '/' + contract.pas_id[0].avatar : this.globalProvider.emptyProfile,
                  name: contract.pas_id[0].name,
                  id: contract.pas_id[0]._id
                }

              else
                this.contracts[i].user = {
                  avatar: contract.user_id[0].avatar ? this.globalProvider.galleryUrl + '/' + contract.user_id[0].avatar : this.globalProvider.emptyProfile,
                  name: contract.user_id[0].name,
                  id: contract.user_id[0]._id
                }

              switch(contract.status) {

                case 0:
                case 3:
                  if(!firstActive)
                    isFirstOfType = true
                  firstActive = true
                  break

                default:
                  if(!firstInactive)
                    isFirstOfType = true
                  firstInactive = true
              }


              if(prevDate != date || isFirstOfType) {
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

            this.parseContracts(this.contracts)
            this.globalProvider.setStorage('contracts', JSON.stringify(this.contracts))
          }

        },
        (error) => {

          console.log('err', error)
        }
      )
  }


  parseContracts(contracts) {
    const self = this

    this.activeContracts = []
    this.inactiveContracts = []

    contracts.map((contract, id) => {
      switch(contract.status) {
        case 0:
          contract.statusText = "Pendiente"
          self.activeContracts.push(contract)
          break
        case 1:
          contract.statusText = "Cancelado"
          self.inactiveContracts.push(contract)
          break
        case 2:
          contract.statusText = "Finalizado"
          self.inactiveContracts.push(contract)
          break
        case 3:
          contract.statusText = "Aprobado"
          self.activeContracts.push(contract)
          break
        case 4:
          contract.statusText = "Rechazado"
          self.inactiveContracts.push(contract)
          break
        case 5:
          contract.statusText = "Fuera de tiempo"
          self.inactiveContracts.push(contract)
          break
      }
    })
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
