// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { VerifyComponent } from './verify/verify.component';
import { DocumentsComponent } from './documents/documents.component';
import { BankComponent } from './bank/bank.component';
import { PoliciesComponent } from './policies/policies.component';
import { DecisionComponent } from './decision/decision.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component';
import { DistributionPointsComponent } from './distribution-points/distribution-points.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
// AuthGurd
import { AuthGuard } from '../../../../../../../../../../src/core/admin/providers/auth.guard';

// Routes
const routes: Routes = [

  { path: '', redirectTo: 'verify', pathMatch: 'full' },
  {
    path: 'verify',
    component: VerifyComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'seller-approved-list',
      urls: [{ title: "Sellers", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Manage Seller", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Seller KYC Request", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Company Details", url: '' }]
    }

  },
  {
    path: 'documents',
    component: DocumentsComponent,
    data: {
      permission: 'seller-approved-list',
      urls: [{ title: "Sellers", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Manage Seller", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Seller KYC Request", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Documents", url: '' }]
    }
  },
  {
    path: 'bank',
    component: BankComponent,
    data: {
      permission: 'seller-approved-list',
      urls: [{ title: "Sellers", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Manage Seller", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Seller KYC Request", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Bank Details", url: '' }]
    }
  },
  {
    path: 'policies',
    component: PoliciesComponent,
    data: {
      permission: 'seller-approved-list',
      urls: [{ title: "Sellers", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Manage Seller", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Seller KYC Request", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Policies", url: '' }]
    }
  },
  {
    path: 'decision',
    component: DecisionComponent,
    data: {
      permission: 'seller-approved-list',
      urls: [{ title: "Sellers", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Manage Seller", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Seller KYC Request", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Decision", url: '' }]
    }
  },
  {
    path: 'decisionsecond',
    component: DecisionComponent
  },

  {
    path: 'categoreis',
    component: CategoriesComponent
  },
  {
    path: 'subscriptionPlan',
    component: SubscriptionPlanComponent
  },
  {
    path: 'storeFront',
    component: StoreFrontComponent,
    data: {
      permission: '',
      urls: [{ title: "Sellers", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Manage Seller", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Seller KYC Request", url: '/seller/manage-seller/seller/seller-onboarding/verification' }, { title: "Store Front", url: '' }]
    }
  },
  {
    path: 'deliveryMethods',
    component: DeliveryMethodsComponent
  },
  {
    path: 'distributionPoints',
    component: DistributionPointsComponent
  },
  {
    path: 'paymentInfo',
    component: PaymentInfoComponent
  },
  {
    path: 'verify/:id',
    component: VerifyComponent,
    canActivate: [AuthGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationsPendingRoutingModule { }
