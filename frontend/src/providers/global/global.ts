import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers, Http } from '@angular/http'
import { Injectable } from '@angular/core';


@Injectable()

export class GlobalProvider {

  public baseUrl: string = "http://46.101.73.97:3000"
  public apiUrl: string = "http://46.101.73.97:3000/api"
  public defaultLatitude: number = -34.6036845
  public defaultLongitude: number = -58.3816649

  constructor(
    public http: HttpClient
  ) {
    console.log('Hello GlobalProvider Provider');
  }


  headersBuilder(auth?: boolean, body?: string) {
    let headers = new Headers()
        headers.append(`Content-Type`, `application/json`)

    let requestOptions

    if(body)
      requestOptions = new RequestOptions({
        headers: headers,
        body: body
      })

    else
      requestOptions = new RequestOptions({
        headers: headers
      })

    return requestOptions
  }

}
