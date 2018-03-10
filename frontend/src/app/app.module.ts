import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { UserPreviewPage } from '../pages/user-preview/user-preview';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserAgreedPage } from '../pages/user-agreed/user-agreed';
import { UserConfigurationPage } from '../pages/user-configuration/user-configuration';
import { ListHistoryPage } from '../pages/list-history/list-history';
import { ListAgreedPage } from '../pages/list-agreed/list-agreed';
import { AgreePage } from '../pages/agree/agree';
import { SignupPage } from '../pages/signup/signup';
import { SignupUserTypePage } from '../pages/signup-user-type/signup-user-type';
import { SigninPage } from '../pages/signin/signin';
import { PaymentSelectPage } from '../pages/payment-select/payment-select';

import { GlobalProvider } from '../providers/global/global';
import { UserProvider } from '../providers/user/user';

//Sockets connect frontend to backend
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://46.101.73.97:3000/', options: {} };



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    UserPreviewPage,
    UserProfilePage,
    UserAgreedPage,
    UserConfigurationPage,
    ListHistoryPage,
    ListAgreedPage,
    AgreePage,
    SignupPage,
    SignupUserTypePage,
    SigninPage,
    PaymentSelectPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    UserPreviewPage,
    UserProfilePage,
    UserAgreedPage,
    UserConfigurationPage,
    ListHistoryPage,
    ListAgreedPage,
    AgreePage,
    SignupPage,
    SignupUserTypePage,
    SigninPage,
    PaymentSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    UserProvider
  ]
})
export class AppModule {}
