// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Third Party
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Routing
import { SellerRoutingModule } from './seller.routing';

// components
import { LayoutComponent } from './layout/layout.component';
import { VerificationPendingComponent } from './verification-pending/verification-pending.component';
import { RejectedSellerComponent } from './rejected-seller/rejected-seller.component';
import { ApprovedSellerComponent } from './approved-seller/approved-seller.component';

// Modules
import { VendorSharedModule } from '../../../../../marketplace/marketplace.module';
import { SharedModule } from '../../../../../../../../../add-ons/shared/shared/shared.module';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';

// Effects
import { SellerSignupRequestsEffect } from '../../../../../../../../core/admin/SellerSignupRequests/Seller Signup/effect/SellerSignupRequests.effect';
import { SellerManagementEffect } from '../../../../../../../../core/admin/manageseller/sellermanagement/effect/sellermanagement.effect';

// Sandbox
import { SellerSignupListSandbox } from '../../../../../../../../core/admin/SellerSignupRequests/Seller Signup/SellerSignupRequests.sandbox';
import { SellerManagementSandbox } from '../../../../../../../../core/admin/manageseller/sellermanagement/sellermanagement.sandbox';

// service
import { SellerSignupRequestsService } from '../../../../../../../../core/admin/SellerSignupRequests/Seller Signup/SellerSignupRequests.service';
import { SellerManagementService } from '../../../../../../../../core/admin/manageseller/sellermanagement/sellermanagement.service';


@NgModule({
    declarations: [
        LayoutComponent,
        VerificationPendingComponent,
        RejectedSellerComponent,
        ApprovedSellerComponent
    ],
    exports: [ ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule,
        SellerRoutingModule,
        VendorSharedModule,
        SharedModule,
        EffectsModule.forFeature([SellerManagementEffect,SellerSignupRequestsEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers:[
      NgbActiveModal,
      SellerManagementSandbox,
      SellerManagementService,
      NgbActiveModal,
      SellerSignupListSandbox,
      SellerSignupRequestsService,
    ]
})
export class SellerOnboardingModule { }
