import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

// services
import { PetProvider } from '../../providers/pet/pet'


@Component({
  selector: 'page-pet-add',
  templateUrl: 'pet-add.html',
})

export class PetAddPage {

  step: number = 1

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
    public loadingCtrl: LoadingController,
    private _petProvider: PetProvider
  ) { }

  ionViewDidLoad() {

    this.step1.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'race': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'size': new FormControl(2, Validators.required),
      'weight': new FormControl(null, Validators.required)
    })
    this.step1.isFormLoaded = true

    this.step2.form = new FormGroup({
      'avatar': new FormControl(null/* FIXME: Mandatory , Validators.required */),
      'description': new FormControl(null, Validators.required)
    })
    this.step2.isFormLoaded = true
  }


  nextStep() {
    this.step = 2
  }


  changeSize(size) {
    this.step1.form.patchValue({
      size: Number(size)
    })

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
        name: step1.value.name,
        race: step1.value.race,
        age: Number(step1.value.age),
        size: Number(step1.value.size),
        weight: Number(step1.value.weight),
        avatar: step2.value.avatar,
        details: step2.value.description,
      }

      this._petProvider.setPet(form).subscribe(
        (response) => {
          loading.dismiss()

        },
        (error) => {
          loading.dismiss()

        }
      )

    }
  }

}
