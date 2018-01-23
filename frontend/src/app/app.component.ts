import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  // used for an example of ngFor and navigation
  pages:any

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  ) {
    let self = this

    this.pages = [
      {
        title: 'Inicio',
        component: MapPage
      },
      {
        title: 'Contratados',
        component: MapPage
      },
      {
        title: 'Historial',
        component: MapPage
      },
      {
        title: 'Mis pagos',
        component: MapPage
      },
      {
        title: 'Configuración',
        component: MapPage
      }
    ]

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      self.statusBar.overlaysWebView(false);
      self.statusBar.backgroundColorByHexString('#82CDB9');
      self.splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
