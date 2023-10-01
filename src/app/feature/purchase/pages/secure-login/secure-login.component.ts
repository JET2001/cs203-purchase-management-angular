import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-secure-login',
  templateUrl: './secure-login.component.html',
  styleUrls: ['./secure-login.component.scss']
})
export class SecureLoginComponent {


  isLoginSuccessful: boolean = false;
  dataValue: string | boolean | undefined = undefined;

  constructor(
    private authService: AuthenticationService
  ){}

  handleLoginClick(){
    let email: string = "jrteo.2022@smu.edu.sg";
    let mobile: string = "06598231539";
    let password: string = "test123";
    this.authService.login(email, mobile, password).subscribe(
      (data: string | boolean) => {
        if (typeof data == typeof ""){ // received a JWT token
          this.authService.saveAuthToken(data.toString()); // save JWT Token to browser local storage.
          this.isLoginSuccessful = true;
        }
        this.dataValue = data;
      }
    )
  }
}
