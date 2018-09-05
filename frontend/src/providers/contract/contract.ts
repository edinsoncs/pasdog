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

  openContract(data) {
    data = JSON.stringify(data)
    let options = this._globalProvider.headersBuilder(true, data)

    return this.http.post(`${ this._globalProvider.apiUrl }/listcontract`, data, options)
  }


}
