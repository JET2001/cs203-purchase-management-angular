import { Routes } from '@angular/router';
import { SecureLoginComponent } from './pages/secure-login/secure-login.component';
import { CategoryPurchaseComponent } from './pages/category-purchase/category-purchase.component';
import { PurchaseConfirmationComponent } from './pages/purchase-confirmation/purchase-confirmation.component';

export const purchaseRoutes: Routes = [
  {
    path: 'login',
    component: SecureLoginComponent,
  },
  {
    path: 'categories',
    component: CategoryPurchaseComponent,
  },
  {
    path: 'confirmation/:selectedCategory',
    component: PurchaseConfirmationComponent,
  }
];
