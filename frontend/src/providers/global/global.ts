import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { RequestOptions, Headers, Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { ToastController, Platform, MenuController } from 'ionic-angular'

// plugins
import { Network } from '@ionic-native/network'
import { Socket } from 'ng-socket-io'


@Injectable()

export class GlobalProvider {

  public onDevice: boolean = this.platform.is('cordova')
  public baseUrl: string = "http://46.101.73.97:3000"
  // public baseUrl: string = "http://192.168.1.55:3000"
  public apiUrl: string = this.baseUrl + "/api"
  public galleryUrl: string = this.baseUrl + '/gallery'
  public galleryDogsUrl: string = this.baseUrl + '/dogs'
  public emptyProfile: string = "assets/imgs/profile.jpg"
  public emptyPetProfile: string = "assets/imgs/pet.jpg"
  public walkerIcon: string = "https://cdn.emojidex.com/emoji/px32/person_with_blond_hair%28p%29.png"
  public userIcon: string = "http://packrat.wdfiles.com/local--files/packrat-best-in-show/buddy-the-dog_small.gif"
  public geolocation: any = {
    latitude: -34.6036845,
    longitude: -58.3816649
  }
  public profile: any = {
    name: '',
    city: '',
    email: '',
    avatar: '',
    user_id: null,
    user_type: null
  }
  public role: number
  public thumbnail: string = this.emptyProfile
  public isGeolocated: boolean = false
  public geolocationHasError: boolean = false

  constructor(
    public http: HttpClient,
    public platform: Platform,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private _network: Network,
    private _socket: Socket
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


  isOnline(defaultToast: boolean = false) {
    let status: boolean

    if(this.onDevice && this._network.type)
      this._network.type == 'none' ? status = false : status = true
    else
      navigator.onLine ? status = true : status = false

    defaultToast && !status ? this.toast('Revisa tu conexión a internet') : null

    return status
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


  logout() {
    this.removeStorage(null, true)
    this.menuCtrl.enable(false)
    this._socket.disconnect()
  }

}
