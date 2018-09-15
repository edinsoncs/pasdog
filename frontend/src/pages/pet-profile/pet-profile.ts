import { Component } from '@angular/core'
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular'

// plugins
import { Camera, CameraOptions } from '@ionic-native/camera'
declare var cordova: any

// pages
import { PetAddPage } from '../pet-add/pet-add'

// providers
import { PetProvider } from '../../providers/pet/pet'
import { GlobalProvider } from '../../providers/global/global'


@Component({
  selector: 'page-pet-profile',
  templateUrl: 'pet-profile.html',
})

export class PetProfilePage {

  id: number
  size: number
  age: number
  weight: number
  name: string
  race: string
  avatar: string
  details: string

  file: string = this.globalProvider.emptyPetProfile
  fileUploading: boolean = false
  fileUploaded: boolean = false
  fileId: number = null
  file64: string
  oldFile: string = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private _camera: Camera,
    public globalProvider: GlobalProvider,
    private _petProvider: PetProvider
  ) { }


  ionViewDidLoad() {
    this.id = this.navParams.get('id')
    this.size = this.navParams.get('size')
    this.age = this.navParams.get('age')
    this.weight = this.navParams.get('weight')
    this.name = this.navParams.get('name')
    this.race = this.navParams.get('race')
    this.avatar = this.navParams.get('avatar')
    this.details = this.navParams.get('details')

    this.file = this.avatar
  }


  ionViewDidEnter() {
    this.id = this.navParams.get('id')
    this.size = this.navParams.get('size')
    this.age = this.navParams.get('age')
    this.weight = this.navParams.get('weight')
    this.name = this.navParams.get('name')
    this.race = this.navParams.get('race')
    this.avatar = this.navParams.get('avatar')
    this.details = this.navParams.get('details')

    this.update()
  }


  update() {
    const isOnline = this.globalProvider.isOnline()

    if(isOnline)
      this._petProvider.getPetById({dogid: this.id}).subscribe(
        (response: any) => {
          if(response) {
            this.id = response._id
            this.size = response.size
            this.age = response.age
            this.weight = response.body
            this.name = response.name
            this.race = response.race
            this.file = response.avatar ? (this.globalProvider.galleryDogsUrl + '/' + response.avatar) : this.globalProvider.emptyPetProfile
            this.details = response.details
          }
        },
        (error) => {

        }
      )
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
        targetWidth: 250,
        targetHeight: 250
      }

       this._camera.getPicture(options).then(
         (imageData) => {

           let base64Image = imageData
           self.uploadFile(base64Image)

         }, (err) => { }
       )

    }


    else{
      if(!this.fileUploading){
        let alert = this.alertCtrl.create({
          title: 'Cambiar foto',
          message: 'Seleccione una opción',
          buttons: [
            {
              text: 'Galería',
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
        this.globalProvider.toast('Espera a que termine de cargarse la imagen actual')
    }

  }


  uploadFile(base64Image) {

    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    })
    loader.present()

    let data = {
      dogid: this.id,
      avatar: base64Image
    }
    this._petProvider.saveImage(data).subscribe(
      (response) => {
        loader.dismiss()
        this.file = 'data:image/jpeg;base64,' + base64Image
        this.globalProvider.toast(`Se actualizó la foto de tu mascota`)
      },
      (error) => {
        loader.dismiss()
        this.globalProvider.toast(`La foto de tu mascota no pudo actualizarse`)
      }
    )

  }


  openPage(page, confirm?) {
    const self = this

    switch(page) {
      case 'pet-edit':
        const payload = {
          dogid: this.id,
          name: this.name,
          size: this.size,
          age: this.age,
          weight: this.weight,
          race: this.race,
          description: this.details
        }
        this.navCtrl.push(PetAddPage, {formEdit: payload})
        break

      case 'pet-delete':
        if(confirm) {
          const isOnline = this.globalProvider.isOnline(true),
                loading = this.loadingCtrl.create()

          if(isOnline) {
            loading.present()

            this._petProvider.deletePet({dogid: this.id}).subscribe(
              (response: any) => {

                // remove pet from storage pet list
                let oldPets: any = this.globalProvider.getStorage('pets'),
                    newPets: any = []

                if(oldPets) {
                  oldPets = JSON.parse(oldPets)
                  oldPets.map((pet, index) => {
                    if(pet._id != this.id)
                      newPets.push(pet)
                  })
                  this.globalProvider.setStorage('pets', JSON.stringify(newPets))
                }

                this.globalProvider.toast(`${ this.name } fue eliminado de tu lista`)
                loading.dismiss()
                this.navCtrl.pop()
              },
              (error) => {
                this.globalProvider.toast(`${ this.name } no pudo eliminarse de tu lista`)
                loading.dismiss()
              }
            )
          }
        }

        else {
          const alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: `¿Deseas eliminar a <strong>${ this.name }</strong> de tu lista de mascotas?`,
            buttons: [
              'No',
              {
                text: 'Eliminar',
                handler: () => self.openPage('pet-delete', true)
              }
            ]
          })
          alert.present()
        }
        break

      case 'options':
        const options = this.actionSheetCtrl.create({
          title: 'Más opciones',
          buttons: [
            {
              text: 'Editar información',
              handler: () => self.openPage('pet-edit')
            },{
              text: 'Eliminar',
              role: 'destructive',
              handler: () => self.openPage('pet-delete')
            }
          ]
        })
        options.present()
        break
    }
  }

}
