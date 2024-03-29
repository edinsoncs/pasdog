import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular'

// plugins
import { Camera, CameraOptions } from '@ionic-native/camera'
declare var cordova: any

// pages
import { PetsPage } from '../pets/pets'

// services
import { GlobalProvider } from '../../providers/global/global'
import { PetProvider } from '../../providers/pet/pet'


@Component({
  selector: 'page-pet-add',
  templateUrl: 'pet-add.html',
})

export class PetAddPage {

  step: number = 1
  file: string
  formEdit: any
  title: string = "Agregar mascota"
  preventRoot: boolean = false

  step1: any = {
    form: null,
    isFormLoaded: false
  }
  step2: any = {
    form: null,
    isFormLoaded: false
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _camera: Camera,
    private _globalProvider: GlobalProvider,
    private _petProvider: PetProvider
  ) { }

  ionViewDidLoad() {

    this.step1.form = new FormGroup({
      'dogid': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'race': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'size': new FormControl(2, Validators.required),
      'weight': new FormControl(null, Validators.required),
      'color': new FormControl('blanco', Validators.required)
    })
    this.step1.isFormLoaded = true

    this.step2.form = new FormGroup({
      'avatar': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })
    this.step2.isFormLoaded = true

    this.formEdit = this.navParams.get('formEdit')
    const formEdit = this.formEdit

    if(formEdit) {
      this.title = "Editar mascota"
      this.step1.form.patchValue({
        dogid: formEdit.dogid,
        name: formEdit.name,
        race: formEdit.race,
        age: formEdit.age,
        size: formEdit.size,
        weight: formEdit.weight,
      })
      this.step2.form.patchValue({
        avatar: 'none',
        description: formEdit.description
      })
    }

    this.preventRoot = this.navParams.get('preventRoot')
  }


  nextStep() {
    this.step = 2
  }


  changeSize(size) {
    this.step1.form.patchValue({
      size: Number(size)
    })
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
           self.file = 'data:image/jpeg;base64,' + base64Image

           this.step2.form.patchValue({
             avatar: base64Image
           })
         }, (err) => self._globalProvider.toast('Ocurrió un problema al cargar la foto')
       )
    }

    else{
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

  }


  formSubmit() {
    let step1 = this.step1.form,
        step2 = this.step2.form

    if(step1.valid && step2.valid) {

      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      })
      loading.present()

      let form = {
        dogid: step1.value.dogid,
        name: step1.value.name,
        race: step1.value.race,
        age: Number(step1.value.age),
        size: Number(step1.value.size),
        weight: Number(step1.value.weight),
        avatar: step2.value.avatar,
        details: step2.value.description,
        color: 'white'
      }

      if(this.formEdit)
        this._petProvider.updatPet(form).subscribe(
          (response: any) => {
            let message = response.message
            this.navCtrl.pop()

            if(response.message)
              this._globalProvider.toast(response.message)
          },
          (error) => {
            this._globalProvider.toast(error.error ? error.error.message : 'Ocurrió un problema al agregar a tu mascota')
          },
          () => loading.dismiss()
        )

      else
        this._petProvider.setPet(form).subscribe(
          (response: any) => {
            let message = response.message
            this.navCtrl.pop()

            if(!this.preventRoot)
              this.navCtrl.setRoot(PetsPage)

            if(response.message)
              this._globalProvider.toast(response.message)
          },
          (error) => {
            this._globalProvider.toast(error.error ? error.error.message : 'Ocurrió un problema al agregar a tu mascota')
          },
          () => loading.dismiss()
        )

    }
  }

}
