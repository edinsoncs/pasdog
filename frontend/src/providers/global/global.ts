import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class GlobalProvider {

  public baseUrl: string = "http://46.101.73.97:3000"
  public apiUrl: string = "http://46.101.73.97:3000/api"
  public defaultLatitude: number = -34.6036845
  public defaultLongitude: number = -58.3816649

  constructor(
    //public http: HttpClient
  ) {
    console.log('Hello GlobalProvider Provider');
  }

}
