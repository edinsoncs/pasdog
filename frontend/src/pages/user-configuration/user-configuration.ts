import { Component } from '@angular/core'
import { NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular'

// plugins
import { Camera, CameraOptions } from '@ionic-native/camera'
import { File } from '@ionic-native/file'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'
import { FilePath } from '@ionic-native/file-path'
declare var cordova: any

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-user-configuration',
  templateUrl: 'user-configuration.html',
})

export class UserConfigurationPage {

  profile: any
  file: string = "https://ta.azureedge.net/p/images/usuarios/l/878872.jpg/300x300cut/?v=2"
  
  fileUploading: boolean = false
  fileUploaded: boolean = false
  fileId: number = null
  file64: string
  oldFile: string = null

  resp: any
  fakeResp: any


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _camera: Camera,
    private _transfer: FileTransfer,
    private _file: File,
    private _filePath: FilePath,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    let profile = this._globalProvider.getStorage('profile')
        this.profile = JSON.parse(profile)
  }

  takePicture(type?: string) {

    let self = this

    if(type){
      let sourceType

      if(type == 'camera')
        sourceType = this._camera.PictureSourceType.CAMERA
      else
        sourceType = this._camera.PictureSourceType.PHOTOLIBRARY

      let options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this._camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        allowEdit: true,
        targetWidth: 140,
        targetHeight: 140
      }

       this._camera.getPicture(options).then(
         (imageData) => {

           let base64Image = imageData
           self.uploadFile(base64Image)

         }, (err) => {
           alert('getPicture Error')
           console.log(err)
         }
       )

    }


    else{
      if(!this.fileUploading){
        let alert = this.alertCtrl.create({
          title: 'Cambiar foto',
          message: 'Seleccione una opción',
          buttons: [
            {
              text: 'Camera roll',
              cssClass: 'text-normal',
              handler: () => {
                this.takePicture('gallery')
              }
            },
            {
              text: 'Sacar foto',
              cssClass: 'text-bold',
              handler: () => {
                this.takePicture('camera')
              }
            }
          ]
        })
        alert.present()
      }
      else
        this._globalProvider.toast('Espera a que termine de cargarse la imagen actual')
    }

  }


  uploadFile(base64Image) {

    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    })
    loader.present()

    let data = {
      avatar: base64Image
    }
    this._userProvider.saveImage(data).subscribe(
      (response) => {
        loader.dismiss()
        this.file = 'data:image/jpeg;base64,' + base64Image
      },
      (error) => {
        loader.dismiss()
      }
    )
/*
    const fileTransfer: FileTransferObject = this._transfer.create()
    let token = this._globalProvider.getStorage('token')

    let options: FileUploadOptions = {
      fileKey: 'avatar',
      fileName: 'profile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {
        "Authorization" : `JWT ${ token }`
      }
    }

    fileTransfer.upload(base64Image, this._globalProvider.apiUrl + '/profile/saveimage', options).then(
      (data) => {
        alert('file upload success')
        this.resp = data
        this.file = 'data:image/jpeg;base64,' + base64Image
        loader.dismiss()
      },
      (err) => {
        alert('file upload error')
        alert(err)
        this.fakeResp = err
        loader.dismiss()
      }
    )
*/
  }

}
