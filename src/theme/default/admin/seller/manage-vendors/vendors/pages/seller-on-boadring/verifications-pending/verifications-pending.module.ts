import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationsPendingRoutingModule } from './verifications-pending-routing.module';
import { PendingLayoutsComponent } from './pending-layouts/pending-layouts.component';
import { VerifyComponent } from './verify/verify.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { CommentmodalComponent } from './commentmodal/commentmodal.component';
import { PoliciesComponent } from './policies/policies.component';
import { BankComponent } from './bank/bank.component';
import { DecisionComponent } from './decision/decision.component';
import { DecisionsecondComponent } from './decisionsecond/decisionsecond.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component';
import { DistributionPointsComponent } from './distribution-points/distribution-points.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { companyVerifyEffect } from '../../../../../../../../../../src/core/admin/manageseller/companyverify/effect/companyverify.effect';
import { companyVerifySandbox } from '../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox';
import { CompanyVerifyService } from '../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.service';
import { bankVerifyEffect } from '../../../../../../../../../../src/core/admin/manageseller/bankVerify/effect/bankVerify.effect';
import { bankVerifySandbox } from '../../../../../../../../../../src/core/admin/manageseller/bankVerify/bankVerify.sandbox';
import { bankVerifyService } from '../../../../../../../../../../src/core/admin/manageseller/bankVerify/bankVerify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecisionVerifyService } from '../../../../../../../../../../src/core/admin/manageseller/decisionverify/decisionverify.service';
import { DecisionVerifySandbox } from '../../../../../../../../../../src/core/admin/manageseller/decisionverify/decisionverify.sandbox';
import { decisionVerifyEffect } from '../../../../../../../../../../src/core/admin/manageseller/decisionverify/effect/decisionverify.effect';
import { StoreVerifyEffect } from '../../../../../../../../../../src/core/admin/manageseller/storeVerify/effect/storeverify.effect';
import { StoreVerifySandbox } from '../../../../../../../../../../src/core/admin/manageseller/storeVerify/storeverify.sandbox';
import { StoreVerifyService } from '../../../../../../../../../../src/core/admin/manageseller/storeVerify/storeverify.service';
import { SellerManagementEffect } from '../../../../../../../../../../src/core/admin/manageseller/sellermanagement/effect/sellermanagement.effect';
import { SellerManagementSandbox } from '../../../../../../../../../../src/core/admin/manageseller/sellermanagement/sellermanagement.sandbox';
import { SellerManagementService } from '../../../../../../../../../../src/core/admin/manageseller/sellermanagement/sellermanagement.service';
import { documentVerifySandbox } from '../../../../../../../../../../src/core/admin/manageseller/documents/document.sandbox';
import { documentVerifyService } from '../../../../../../../../../../src/core/admin/manageseller/documents/document.service';
import { documentVerifyEffect } from '../../../../../../../../../../src/core/admin/manageseller/documents/effect/document.effect';
import { PendingLayoutService } from '../../../../../../../../../../src/core/admin/manageseller/pending-layouts/pending-layout.service';
import { PendingLayoutSandox } from '../../../../../../../../../../src/core/admin/manageseller/pending-layouts/pending-layout.sandbox';
import { PendingLayoutEffect } from '../../../../../../../../../../src/core/admin/manageseller/pending-layouts/effect/pending-layout.effect';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { SellerCategoriesSandbox } from '../../../../../../../../../../src/core/admin/manageseller/categories/sellerCategories.sandbox';
import { SellerCategoriesService } from '../../../../../../../../../../src/core/admin/manageseller/categories/sellerCategories.service';
import { SellerCategoriesEffect } from '../../../../../../../../../../src/core/admin/manageseller/categories/effect/sellerCategories.effect';
import { ComponentsModule } from '../../../../../../shared/components';
import { VendorSharedModule } from '../../../../../../../../../../src/theme/default/admin/marketplace/marketplace.module';
import { VendorGroupSandbox } from 'src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox';
import { VendorGroupService } from 'src/core/admin/vendor/pages/vendor-group/vendor-group.service';
import { vendorGroupEffects } from 'src/core/admin/vendor/pages/vendor-group/vendor-group-effects/vendor-group.effects';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    PendingLayoutsComponent,
    VerifyComponent,
    DocumentsComponent,
    CommentmodalComponent,
    PoliciesComponent,
    BankComponent,
    DecisionComponent,
    DecisionsecondComponent,
    CategoriesComponent,
    SubscriptionPlanComponent,
    StoreFrontComponent,
    DeliveryMethodsComponent,
    DistributionPointsComponent,
    PaymentInfoComponent,
    

  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    VerificationsPendingRoutingModule,
    VendorSharedModule,
    SharedModule,
    EffectsModule.forFeature([companyVerifyEffect,bankVerifyEffect,decisionVerifyEffect,StoreVerifyEffect,SellerManagementEffect,documentVerifyEffect,PendingLayoutEffect,SellerCategoriesEffect, vendorGroupEffects]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ComponentsModule
  ]
  ,providers:[
    SellerCategoriesSandbox,
    SellerCategoriesService,
    companyVerifySandbox,
    CompanyVerifyService,
    bankVerifySandbox,
    bankVerifyService,
    DecisionVerifyService,
    DecisionVerifySandbox,
    StoreVerifySandbox,
    StoreVerifyService,
    SellerManagementSandbox,
    SellerManagementService,
    documentVerifySandbox,
    documentVerifyService,
    PendingLayoutService,
    PendingLayoutSandox,
    NgbActiveModal,
    VendorGroupSandbox,
    VendorGroupService
  ]
})
export class VerificationsPendingModule { }
