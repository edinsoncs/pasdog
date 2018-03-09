import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';


@Injectable()

export class GlobalProvider {

  public baseUrl: string = "http://localhost:3000";
  public apiUrl: string = this.baseUrl + "/api";
  public geolocation: any ={
    latitude: -34.6036845,
    longitude: -58.3816649
  }

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController
  ) { }


  headersBuilder(auth?: boolean, body?: string) {
    let headers

    if(auth)
      headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `JWT ${ this.getStorage('token') }`,
      })

    else
      headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })

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


  setStorage(key: string, value: any){
    localStorage.setItem(key, value)
    console.log('set :', key, ' value: ', value)
  }


  getStorage(key: string){
    return localStorage.getItem(key)
  }


  removeStorage(key: string, all?: boolean){
    all ? localStorage.clear() : localStorage.removeItem(key)
  }


  toast(message: string, duration: number = 3000, position: string = 'bottom') {
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: 'custom-toast'
    }).present()
  }

}
