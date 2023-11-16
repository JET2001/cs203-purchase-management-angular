import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureLoginComponent } from './pages/secure-login/secure-login.component';
import { CategoryPurchaseComponent } from './pages/category-purchase/category-purchase.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { purchaseRoutes } from './purchase.routing';
import { ShowTableComponent } from './components/show-table/show-table.component';
import { PurchaseCategoriesPopupComponent } from './components/purchase-categories-popup/purchase-categories-popup.component';
import { PurchaseConfirmationComponent } from './pages/purchase-confirmation/purchase-confirmation.component';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    SecureLoginComponent,
    CategoryPurchaseComponent,
    ShowTableComponent,
    PurchaseCategoriesPopupComponent,
    PurchaseConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(purchaseRoutes),
    HttpClientModule,
  ]
})
export class PurchaseModule { }
