import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureLoginComponent } from './pages/secure-login/secure-login.component';
import { CategoryPurchaseComponent } from './pages/category-purchase/category-purchase.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { purchaseRoutes } from './purchase.routing';



@NgModule({
  declarations: [
    SecureLoginComponent,
    CategoryPurchaseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(purchaseRoutes)
  ]
})
export class PurchaseModule { }
