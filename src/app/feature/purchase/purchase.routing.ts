import { Routes } from '@angular/router';
import { SecureLoginComponent } from './pages/secure-login/secure-login.component';
import { CategoryPurchaseComponent } from './pages/category-purchase/category-purchase.component';
import { PurchaseConfirmationComponent } from './pages/purchase-confirmation/purchase-confirmation.component';
import { logInGuard } from './user-login.guards';

export const purchaseRoutes: Routes = [
  {
    //login/<GROUPID>/<EVENTID>/<QUEUEID>
    path: 'login/:groupid/:eventid/:showid/:queueid',
    component: SecureLoginComponent,
  },
  {
    path: 'categories',
    component: CategoryPurchaseComponent,
    canActivate: [logInGuard()]
  },
  {
    path: 'confirmation/:selectedCategory',
    component: PurchaseConfirmationComponent,
    canActivate: [logInGuard()]
  }
];
