import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

// pages
import { SignupPage } from '../signup/signup';
import { MapPage } from '../map/map';

import { Socket } from 'ng-socket-io';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private socket: Socket
  ) { }


  login() {
    let self = this

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loading.present();

    setTimeout(() => {
      self.navCtrl.setRoot(MapPage);
      loading.dismiss();
    }, 700)

    
  }

  ngOnInit(){
    this.socket.connect();
  };

  signup() {
    this.navCtrl.push(SignupPage)
  }

}
