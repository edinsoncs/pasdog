import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

// Providers
import { GlobalProvider } from '../global/global'


@Injectable()

export class ContractProvider {

  constructor(
    public http: HttpClient,
    private _globalProvider: GlobalProvider
  ) {
    console.log('Hello ContractProvider Provider')
  }


  newContract(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/newcontract`, data, options)
  }

  getContract() {
    let options = this._globalProvider.headersBuilder(true, null)

    return this.http.post(`${ this._globalProvider.apiUrl }/listcontract`, null, options)
  }

  getContractPets(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/alldog`, data, options)
  }

  openContract(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/listcontract`, data, options)
  }

  getChat(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/listchat`, data, options)
  }

  newChatMessage(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/savechat`, data, options)
  }

  updateStatus(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/updatecontract`, data, options)
  }

}
