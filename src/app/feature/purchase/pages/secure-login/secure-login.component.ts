import { GetGroupInfoService } from './../../../../shared/services/get-group-info/get-group-info.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { IpServiceService } from 'src/app/core/services/ip-service/ip-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/shared/components/login-popup/login-popup.component';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';

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
    private activeModal: NgbModal,
    private route: ActivatedRoute,
    private getEventInfoService: GetEventInfoService,
    private GetGroupInfoService: GetGroupInfoService,
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
    const groupid = this.route.snapshot.paramMap.get('groupid');
    const eventid = this.route.snapshot.paramMap.get('eventid');
    const queueid = this.route.snapshot.paramMap.get('queueid');
    const showid = this.route.snapshot.paramMap.get('showid');
    this.getEventInfoService.setEventId = eventid!;
    this.getEventInfoService.setShowId = showid!;
    this.GetGroupInfoService.setGroupId = groupid!;
    // console.log(groupid)
    // console.log(eventid)
    // console.log(queueid)

    let data = {
      groupid: groupid,
      eventid: eventid,
      queueid: queueid,
    };
    const modalRef = this.activeModal.open(LoginPopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.fromParent = data;
    modalRef.componentInstance.navigateUser.subscribe((value: boolean) => {
      if (value) {
        this.router.navigateByUrl('purchase/categories', {
          //login/:groupid/:eventid/:showid/:queueid
          state: {
            groupid: this.route.snapshot.paramMap.get('groupid')!,
            eventid: this.route.snapshot.paramMap.get('eventid')!,
            showid: this.route.snapshot.paramMap.get('showid')!,
            queueid: this.route.snapshot.paramMap.get('queueid')!,
          },
        });
      }
    });
  }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }
}
