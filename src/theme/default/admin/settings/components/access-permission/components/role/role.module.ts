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
import { DefaultCommonModule } from '../../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { RoleAddComponent } from './add/add.component';
import { RoleListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { RoleSandbox } from '../../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../../core/admin/settings/role/role.ApiClientService';
import { RoleEffects } from '../../../../../../../../core/admin/settings/role/role-effects/role.effects';

// Routing Module
import { RoleRoutingModule } from './role.routing';

// Shared Module
import { MaterialModule } from '../../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../../shared/components';

@NgModule({
    declarations: [RoleAddComponent, RoleListComponent],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        RoleRoutingModule,
        EffectsModule.forFeature([RoleEffects]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [RoleApiClientService, RoleSandbox],
    bootstrap: []
})
export class RoleModule {}
