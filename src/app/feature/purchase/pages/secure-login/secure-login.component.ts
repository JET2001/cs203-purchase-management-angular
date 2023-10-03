import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-secure-login',
  templateUrl: './secure-login.component.html',
  styleUrls: ['./secure-login.component.scss']
})
export class SecureLoginComponent {

  loginFG: FormGroup;
  emailFC: FormControl = new FormControl('', []);
  mobileFC: FormControl = new FormControl('', []);
  passwordFC: FormControl = new FormControl('', []);
  checkboxFC: FormControl = new FormControl(false);

  showInvalidLoginMessage: boolean = false;

  isLoginSuccessful: boolean = false;
  dataValue: string | boolean | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ){
    this.loginFG = this.fb.group({
      email: this.emailFC,
      mobile: this.mobileFC,
      password: this.passwordFC,
      checkbox: this.checkboxFC,
    });
  }

  handleLoginClick(){
    if (!this._fieldsAllValid()) return;
    // let email: string = "jrteo.2022@smu.edu.sg";
    // let mobile: string = "06598231539";
    // let password: string = "test123";
    let mobile = this.processMobile();
    this.authService.login(this.emailFC.value, mobile, this.passwordFC.value).subscribe(
      (data: string | boolean) => {
        if (typeof data == typeof ""){ // received a JWT token
          this.authService.saveAuthToken(data.toString()); // save JWT Token to browser local storage.
          this.isLoginSuccessful = true;
        } 
        this.dataValue = data;
      }
    )
  }

  private _fieldsAllValid(): boolean {
    for (let value of [
      this.emailFC.value,
      this.mobileFC.value,
      this.passwordFC.value,
    ]) {
      if (value == null || value == undefined || value == '') {
        this.showInvalidLoginMessage = true;
        return false;
      }
    }
    this.showInvalidLoginMessage = false;
    return true;
  }

  private processMobile(): string {
    let mobile: string = this.mobileFC.value;
    mobile = mobile.replace('+', '0');
    return mobile;
  }
}
