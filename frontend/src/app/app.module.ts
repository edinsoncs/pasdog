import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { UserPreviewPage } from '../pages/user-preview/user-preview';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserAgreedPage } from '../pages/user-agreed/user-agreed';
import { HistoryPage } from '../pages/history/history';
import { AgreePage } from '../pages/agree/agree';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    UserPreviewPage,
    UserProfilePage,
    UserAgreedPage,
    HistoryPage,
    AgreePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    UserPreviewPage,
    UserProfilePage,
    UserAgreedPage,
    HistoryPage,
    AgreePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
