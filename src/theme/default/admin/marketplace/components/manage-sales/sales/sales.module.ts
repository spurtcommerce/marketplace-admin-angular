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
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../../shared/components';
import { VendorSharedModule } from '../../../marketplace.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { Title } from '@angular/platform-browser';
import { combineArrays, permissionConfigs } from 'src/theme/default/admin/shared/components/services/permission.constant';
const salesRoutes: Routes = [
    {
        path: '', component: SalesLayoutComponent,
        children: [
            { path: '', redirectTo: 'order', pathMatch: 'full'},
            { path: 'order',
            loadChildren: () => import('./pages/order/order.module').then(m => m.SalesOrderModule),
            canActivate: [AuthGuard],
            data: { permissionForRoot : combineArrays(permissionConfigs['order'])},
            },
        ]
    },
];
@NgModule({
    declarations: [SalesLayoutComponent
    
    ],
    imports: [
        RouterModule.forChild(salesRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [Title],
    bootstrap: []
})
export class VendorSalesModule {}
