/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { ChangepasswordEffect } from '../../../../../core/admin/profile/changepassword/changepassword-effect/changepassword.effect';
import { ChangePasswordComponent } from './changepassword.component';
import { ChangepasswordSandbox } from '../../../../../core/admin/profile/changepassword/changepassword.sandbox';
import { ChangePasswordService } from '../../../../../core/admin/profile/changepassword/changepassword.service';
import { ChangePasswordRouting } from './changepassword.routing';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../shared/components';
import { PasswordShowModule } from '../../../../../core/admin/shared/password-show.directives/passwordShow.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    EffectsModule.forFeature([ChangepasswordEffect]),
    ChangePasswordRouting,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    PasswordShowModule
  ],
  declarations: [ChangePasswordComponent],
  providers: [ChangepasswordSandbox, ChangePasswordService]
})
export class ChangePasswordModule {}
