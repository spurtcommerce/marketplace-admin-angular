/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationPendingComponent } from './verification-pending/verification-pending.component';
import { RejectedSellerComponent } from './rejected-seller/rejected-seller.component';
import { ApprovedSellerComponent } from './approved-seller/approved-seller.component';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { PendingLayoutsComponent } from './verifications-pending/pending-layouts/pending-layouts.component';
import { SellerSignupRequestListComponent } from '../seller-signup-requests/list/list.component';


const sellerRoutes: Routes = [
  { path: '', redirectTo:'pending-submissions', pathMatch: 'full'},
  {
    path: 'verification',
    component: VerificationPendingComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'approval-pending-list',
      urls: [{ title: "Sellers", url: '' },{ title: "Manage Seller", url: '' },{ title: "Seller KYC Request ", url: '' },{ title:"Awaiting Review", url: '' }]
    }
  },

  {
    path: 'pending-submissions',
    component: SellerSignupRequestListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'approved-list',
      urls: [{ title: "Sellers", url: '' },{ title: "Manage Seller", url: '' },{ title: "Seller KYC Request", url: '' },{ title:"Pending Submissions", url: '' }]
    }
  },

  {
    path: 'approved',
    component: ApprovedSellerComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'approved-list',
      urls: [{ title: "Sellers", url: '' },{ title: "Manage Seller", url: '' },{ title: "Seller KYC Request", url: '' },{ title:"Approved KYCs", url: '' }]
    }
  },
  {
    path: 'rejected',
    component: RejectedSellerComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'rejected-list',
      urls: [{ title: "Sellers", url: '' },{ title: "Manage Seller", url: '' },{ title: "Seller KYC Request", url: '' },{ title:"Rejected KYCs", url: '' }]
    }
  },
  {
    path: 'verify',
    component: PendingLayoutsComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./verifications-pending/verifications-pending.module').then(m => m.VerificationsPendingModule),
    // data: { permissionForRoot : combineArrays( combineArrays(permissionsConfigs['seller-Onboarding'])),root: 'vendors'}
  },

];

@NgModule({
  imports: [RouterModule.forChild(sellerRoutes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
