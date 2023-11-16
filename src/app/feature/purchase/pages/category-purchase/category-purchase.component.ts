import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { GetSeatInfoService } from 'src/app/shared/services/get-seat-info/get-seat-info.service';
import { PurchaseCategoriesPopupComponent } from '../../components/purchase-categories-popup/purchase-categories-popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-purchase',
  templateUrl: './category-purchase.component.html',
  styleUrls: ['./category-purchase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryPurchaseComponent extends BaseComponent implements OnInit {
  eventid: string;
  groupid: string;
  showid: string;
  queueid: string;
  userid: string;
  eventTitle: string;
  categories: Array<any>;
  categoriesForm: FormGroup;
  selectedCategory: string | undefined;
  showSeatingPlan = false;
  groupSize: number | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private activeModal: NgbModal,
    private getSeatInfoService: GetSeatInfoService,
    private getEventInfoService: GetEventInfoService,
    private getGroupInfoService: GetGroupInfoService,
    protected override spinner: NgxSpinnerService
  ) {
    super(spinner);
    this.categoriesForm = this.fb.group({});
  }

  async ngOnInit() {
    // //use mock data for Taylor Swift concert
    // this.eventTitle = 'Taylor Swift The Eras Tour';
    // this.eventID = 'tswift-era-2024';
    // // if category has less than (group size) amount of tickets
    // // remaining, remove it from array
    // this.categories = ['CAT 1', 'CAT 2', 'CAT 3', 'CAT 4', 'CAT 5', 'CAT 6']
    // this.activeModal.open(PurchaseCategoriesPopupComponent, { centered: true });
    // this.groupSize = 4;
    // login/:groupid/:eventid/:showid/:queueid
    this.eventid = this.getEventInfoService.getEventId;
    this.showid = this.getEventInfoService.getShowId;
    this.groupid = this.getGroupInfoService.getGroupId;
    this.userid = this.authService.userID!;
    this.spinnerShow();
    await this.getEventInfoService.getEventTitle().subscribe((event) => {
      this.eventTitle = event.eventTitle;
    });

    await this.getSeatInfoService
      .getSeatCategories(this.eventid, this.showid)
      .subscribe((data) => {
        this.categories = data.map(
          (item: { categoryId: any }) => item.categoryId
        );
      });
    this.spinnerHide();
  }

  handleBack() {
    this.authService.email = undefined;
    this.authService.userID = undefined;
    this.authService.user = undefined;
    this.router.navigate(['/login']);
  }

  handleNext() {
    this.getSeatInfoService
      .submitSeatChoices(
        this.groupid,
        this.eventid,
        this.showid,
        this.userid,
        this.selectedCategory!
      )
      .subscribe((data) => {
        // shift everyone in the queue forward by 1
        this.getGroupInfoService.updateQueueNumber();
        this.router.navigate(['/purchase/confirmation', this.selectedCategory]);
      });
    // // shift everyone in the queue forward by 1
    // this.getGroupInfoService.updateQueueNumber();
    // this.router.navigate(['/purchase/confirmation', this.selectedCategory]);
  }

  handleInformationClick(): void {
    this.activeModal.open(PurchaseCategoriesPopupComponent, { centered: true });
  }

  toggleSeatingPlan(): void {
    this.showSeatingPlan = !this.showSeatingPlan; // Toggle the value
  }
}
