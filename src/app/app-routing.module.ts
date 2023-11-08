import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  // main app page
  {
    path: 'purchase',
    loadChildren: () => import('./feature/purchase/purchase.module').then(m => m.PurchaseModule)
  },
   {
    path: 'queue',
    loadChildren: () => import('./feature/queue/queue.module').then(m => m.QueueModule)
  },
  // route all other paths to home page
  {
    path: '**', redirectTo: '/purchase/login', pathMatch: 'full'
  }
]
