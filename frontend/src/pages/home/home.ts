import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

// pages
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';
import { MapPage } from '../map/map';

// providers
import { GlobalProvider } from '../../providers/global/global';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private _socket: Socket
  ) { }


  ionViewDidLoad() {
    // this._socket.connect()
  }


  login(type) {
    let self = this

    if(type == 'email'){
      self.navCtrl.push(SigninPage);
    }

    else{

      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      })
      loading.present();

      setTimeout(() => {
        self.navCtrl.setRoot(MapPage);
        loading.dismiss();
      }, 700)
    }

  }


  signup() {
    this.navCtrl.push(SignupPage)
  }

}
