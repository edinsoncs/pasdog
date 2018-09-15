import { Component, ViewChild } from '@angular/core'
import { App, IonicApp, Nav, Platform, AlertController } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Geolocation } from '@ionic-native/geolocation'

import { HomePage } from '../pages/home/home'
import { MapPage } from '../pages/map/map'
import { ListHistoryPage } from '../pages/list-history/list-history'
import { UserConfigurationPage } from '../pages/user-configuration/user-configuration'
import { PetsPage } from '../pages/pets/pets'
import { UserCommentsPage } from '../pages/user-comments/user-comments'

import { GlobalProvider } from '../providers/global/global'


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  // used for an example of ngFor and navigation
  pages:any

  constructor(
    public app: App,
    public ionicApp: IonicApp,
    public platform: Platform,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _geolocation: Geolocation,
    private _globalProvider: GlobalProvider
  ) {
    let self = this

    this.pages = [
      {
        title: 'Inicio',
        component: MapPage
      },
      {
        title: 'Mis paseos',
        component: ListHistoryPage
      },
      {
        title: 'Consultas',
        count: 3,
        component: UserCommentsPage,
        user_type: 1
      },
      {
        title: 'Mis mascotas',
        component: PetsPage,
        user_type: 0
      },
      {
        title: 'Configuración',
        component: UserConfigurationPage
      }
    ]

    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      self.statusBar.overlaysWebView(false)
      self.statusBar.backgroundColorByHexString('#82CDB9')
      self.splashScreen.hide()

      // get current position
      this._geolocation.getCurrentPosition().then(
        (res) => {
          let geolocation = {
            latitude: res.coords.latitude,
            longitude: res.coords.longitude
          }
          self._globalProvider.geolocation = geolocation
          self._globalProvider.isGeolocated = true
          self._globalProvider.geolocationHasError = false
        },
        (err) => {
          console.log(err)
          self._globalProvider.geolocationHasError = true
          let message
          err.code == 1 ? message = 'Geolocalización no permitida' : message = 'Ocurrió un problema al geolocalizarte'
          this._globalProvider.toast(message)
        }
      )

      // register back button
      self.platform.registerBackButtonAction(() => {
        let nav = self.app.getActiveNavs()[0],
            activePortal = this.ionicApp._loadingPortal.getActive() ||

        this.ionicApp._modalPortal.getActive() ||
        this.ionicApp._toastPortal.getActive() ||
        this.ionicApp._overlayPortal.getActive()

        if (activePortal) {
          activePortal.dismiss()
        }
        else {
          if(nav.canGoBack()) {
            nav.pop()
          }
          else {
            let alert = this.alertCtrl.create({
              title: 'Salir',
              message: '¿Estás seguro que deseas salir de PASDOG?',
              buttons: [
                'Cancelar',
                {
                  text: 'Si, salir',
                  handler: () => self.platform.exitApp()
                }
              ]
            })
            alert.present()
          }
        }
      })

    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
