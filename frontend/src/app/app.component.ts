import { Component, ViewChild } from '@angular/core'
import { Nav, Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { Geolocation } from '@ionic-native/geolocation'

import { HomePage } from '../pages/home/home'
import { MapPage } from '../pages/map/map'
import { ListAgreedPage } from '../pages/list-agreed/list-agreed'
import { ListHistoryPage } from '../pages/list-history/list-history'
import { UserConfigurationPage } from '../pages/user-configuration/user-configuration'
import { PetsPage } from '../pages/pets/pets'

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
    public platform: Platform,
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
        title: 'Contratados',
        component: ListAgreedPage
      },
      {
        title: 'Historial',
        component: ListHistoryPage
      },
      {
        title: 'Mis pagos',
        component: MapPage
      },
      {
        title: 'Mis mascotas',
        component: PetsPage
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

    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
