import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { ComponentsModule } from '../components/components.module'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { GoogleMaps } from '@ionic-native/google-maps'
import { Geolocation } from '@ionic-native/geolocation'
import { NativeGeocoder } from '@ionic-native/native-geocoder'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'
import { FilePath } from '@ionic-native/file-path'
import { File } from '@ionic-native/file'
import { Camera } from '@ionic-native/camera'
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io'
import { Network } from '@ionic-native/network'

import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { MapPage } from '../pages/map/map'
import { UserPreviewPage } from '../pages/user-preview/user-preview'
import { UserProfilePage } from '../pages/user-profile/user-profile'
import { UserAgreedPage } from '../pages/user-agreed/user-agreed'
import { UserConfigurationPage } from '../pages/user-configuration/user-configuration'
import { UserConfigurationEditPage } from '../pages/user-configuration-edit/user-configuration-edit'
import { ListHistoryPage } from '../pages/list-history/list-history'
import { AgreePage } from '../pages/agree/agree'
import { SignupPage } from '../pages/signup/signup'
import { SignupUserTypePage } from '../pages/signup-user-type/signup-user-type'
import { SigninPage } from '../pages/signin/signin'
import { PaymentSelectPage } from '../pages/payment-select/payment-select'
import { PetsPage } from '../pages/pets/pets'
import { PetProfilePage } from '../pages/pet-profile/pet-profile'
import { PetAddPage } from '../pages/pet-add/pet-add'
import { UserWalkerCompletePage } from '../pages/user-walker-complete/user-walker-complete'
import { PetsListModalPage } from '../pages/pets-list-modal/pets-list-modal'
import { UserCommentsPage } from '../pages/user-comments/user-comments'

import { GlobalProvider } from '../providers/global/global'
import { UserProvider } from '../providers/user/user'
import { PetProvider } from '../providers/pet/pet'
import { ContractProvider } from '../providers/contract/contract'

const SOCKET_CONFIG: SocketIoConfig = { url: 'http://46.101.73.97:3000/', options: {} }


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    UserPreviewPage,
    UserProfilePage,
    UserAgreedPage,
    UserConfigurationPage,
    UserConfigurationEditPage,
    ListHistoryPage,
    AgreePage,
    SignupPage,
    SignupUserTypePage,
    SigninPage,
    PaymentSelectPage,
    PetsPage,
    PetProfilePage,
    PetAddPage,
    UserWalkerCompletePage,
    PetsListModalPage,
    UserCommentsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(SOCKET_CONFIG),
    ComponentsModule
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
    UserConfigurationEditPage,
    ListHistoryPage,
    AgreePage,
    SignupPage,
    SignupUserTypePage,
    SigninPage,
    PaymentSelectPage,
    PetsPage,
    PetProfilePage,
    PetAddPage,
    UserWalkerCompletePage,
    PetsListModalPage,
    UserCommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    NativeGeocoder,
    FileTransfer,
    FileTransferObject,
    FilePath,
    File,
    Camera,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    UserProvider,
    PetProvider,
    ContractProvider
  ]
})
export class AppModule {}
