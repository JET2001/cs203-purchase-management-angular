import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { IpServiceService } from 'src/app/core/services/ip-service/ip-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';

@Component({
  selector: 'app-secure-login',
  templateUrl: './secure-login.component.html',
  styleUrls: ['./secure-login.component.scss'],
})
export class SecureLoginComponent implements OnInit {
  loginFG: FormGroup;
  emailFC: FormControl = new FormControl('', []);
  mobileFC: FormControl = new FormControl('', []);
  passwordFC: FormControl = new FormControl('', []);
  checkboxFC: FormControl = new FormControl(false);

  showInvalidLoginMessage: boolean = false;

  isLoginSuccessful: boolean = false;
  dataValue: string | boolean | undefined = undefined;
  ipAddress: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private getUserInfoService: GetUserInfoService,
    private ip: IpServiceService,
    private activeModal: NgbModal
  ) {
    this.loginFG = this.fb.group({
      email: this.emailFC,
      mobile: this.mobileFC,
      password: this.passwordFC,
      checkbox: this.checkboxFC,
    });
  }

  ngOnInit(): void {
    this.isLoginSuccessful = false;
    this.dataValue = undefined;
    this.showInvalidLoginMessage = false;
    this.getIP();
    const modalRef = this.activeModal.open(LoginPopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.navigateUser.subscribe((value: boolean) => {
      if (value) {
        this.router.navigate(['purchase/categories']);
      }
    });
  }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

}
