import { Component } from '@angular/core'
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { NavController, NavParams, LoadingController } from 'ionic-angular'

// providers
import { GlobalProvider } from '../../providers/global/global'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-user-configuration-edit',
  templateUrl: 'user-configuration-edit.html',
})

export class UserConfigurationEditPage {

  form: any
  isFormLoaded: boolean = false
  profile: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    this.profile = JSON.parse(this._globalProvider.getStorage('profile'))
    const profile = this.profile,
          loading = this.loadingCtrl.create()

    loading.present()

    if(profile.user_type == 0)
      this.form = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'city': new FormControl(null, Validators.required)
      })

    else
      this.form = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'city': new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
      })

    this.isFormLoaded = true

    if(profile) {
      if(profile.user_type == 0)
        this.form.patchValue({
          name: profile.name,
          email: profile.email,
          city: profile.city
        })

      else
        this.form.patchValue({
          name: profile.name,
          email: profile.email,
          city: profile.city,
          description: profile.details,
          price: profile.price
        })
    }

    this.getProfile(loading)
  }


  getProfile(loading?) {
    this._userProvider.getProfile().subscribe(
      (response) => {
        this.profile = response[0].data
        loading ? loading.dismiss() : null
      },
      (error) => loading ? loading.dismiss() : null
    )
  }


  save() {
    const form = this.form,
          loading = this.loadingCtrl.create()

    if(form.valid) {
      loading.present()

      this._userProvider.editUser(form.value).subscribe(
        (response) => {
          this._globalProvider.profile.name = form.value.name
          this._globalProvider.profile.email = form.value.email
          this._globalProvider.profile.city = form.value.city
          this._globalProvider.setStorage('profile', JSON.stringify(this._globalProvider.profile))

          this.navCtrl.pop()
          loading.dismiss()
        },
        (error) => {
          this._globalProvider.toast('Ocurrió un problema y los cambios no pudieron ser guardados')
          loading.dismiss()
        }
      )

    }
  }

}
