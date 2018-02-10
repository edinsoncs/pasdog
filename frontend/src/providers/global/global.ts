import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()

export class GlobalProvider {

  public baseUrl: string = "http://46.101.73.97:3000";
  public apiUrl: string = "http://46.101.73.97:3000/api";
  public defaultLatitude: number = -34.6036845;
  public defaultLongitude: number = -58.3816649;

  constructor(
    public http: HttpClient
  ) { }


  headersBuilder(auth?: boolean, body?: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    let requestOptions;

    if(body)
      requestOptions = {
        headers: headers,
        body: body
      };

    else
      requestOptions = {
        headers: headers
      };

    return requestOptions;
  }

}
