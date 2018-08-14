import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular'

// pages
import { MapPage } from '../map/map'

// services
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-user-walker-complete',
  templateUrl: 'user-walker-complete.html',
})

export class UserWalkerCompletePage {

  form: any
  isFormLoaded: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    this.form = new FormGroup({
      'price': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    })
    this.isFormLoaded = true

  }


  save() {

    if(this.form.valid) {

      let form = this.form,
          loading = this.loadingCtrl.create({
            content: 'Cargando...'
          })
      loading.present()

      this._userProvider.walkerProfile(form.value).subscribe(
        (response: any) => {

          this._userProvider.setUserType({ type: 1 }).subscribe(
            (response: any) => {
              loading.dismiss()

              if(response.status == 0) {
                let message = response.message ? response.message : 'Ocurrió un problema al guardar los datos'
                this._globalProvider.toast(message)
              }
              else {
                this.navCtrl.setRoot(MapPage)
                this.menuCtrl.enable(false)
              }

            },
            (error) => {
              loading.dismiss()
            }
          )

        },
        (error) => {
          loading.dismiss()
          this._globalProvider.toast('Usuario o contraseña incorrectos')
        }
      )
    }
  }

}
