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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _globalProvider: GlobalProvider,
    private _userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'city': new FormControl(null, Validators.required)
    })
    this.isFormLoaded = true

    const profile = JSON.parse(this._globalProvider.getStorage('profile'))
    if(profile) {
      this.form.patchValue({
        name: profile.name,
        email: profile.email,
        city: profile.city
      })
    }

    // this.getProfile()
  }


  save() {
    const form = this.form

    if(form.valid) {
      this._userProvider.editUser(form.value).subscribe(
        (response) => {

          console.log('res', response)
        },
        (error) => {

          console.log('err', error)
        }
      )

    }

  }

}
