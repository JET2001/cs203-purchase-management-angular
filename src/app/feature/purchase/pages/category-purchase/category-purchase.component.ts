import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { PurchaseCategoriesPopupComponent } from '../../components/purchase-categories-popup/purchase-categories-popup.component';
import { GetSeatInfoService } from 'src/app/shared/services/get-seat-info/get-seat-info.service';
import { GetEventInfoService } from 'src/app/shared/services/get-event-info/get-event.info.service';
import { GetGroupInfoService } from 'src/app/shared/services/get-group-info/get-group-info.service';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';

@Component({
  selector: 'app-category-purchase',
  templateUrl: './category-purchase.component.html',
  styleUrls: ['./category-purchase.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryPurchaseComponent implements OnInit {
  eventid: string;
  groupid: string;
  showid: string;
  queueid: string;
  userid: string;
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
    private getGroupInfoService: GetGroupInfoService
  ) {
    this.categoriesForm = this.fb.group({});
  }

  ngOnInit() {
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
    this.userid = this.authService.email!;

    this.getSeatInfoService
      .getSeatCategories(this.eventid, this.showid)
      .subscribe((data) => {
        this.categories = data.map(
          (item: { categoryId: any }) => item.categoryId
        );
      });
  }

  handleBack() {
    this.authService.email = undefined;
    this.authService.userID = undefined;
    this.authService.user = undefined;
    this.router.navigate(['/login']);
  }

  handleNext() {
    this.getSeatInfoService.submitSeatChoices(
      this.groupid,
      this.eventid,
      this.showid,
      this.userid,
      this.selectedCategory!
    ).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['/purchase/confirmation', this.selectedCategory]);
  }

  handleInformationClick(): void {
    this.activeModal.open(PurchaseCategoriesPopupComponent, { centered: true });
  }

  toggleSeatingPlan(): void {
    this.showSeatingPlan = !this.showSeatingPlan; // Toggle the value
  }
}
