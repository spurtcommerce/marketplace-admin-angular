/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { combineArrays, permissionConfigs } from '../shared/components/services/permission.constant';


const customersRoutes: Routes = [
  { path: '', redirectTo: 'manage-customers', pathMatch: 'full' },
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      {
        path: 'manage-customers',
        loadChildren: () => import('./components/manage-customers/manage-customers.module').then(m => m.ManageCustomersModule),
        canActivate: [AuthGuard],
        data: { permissionForRoot : combineArrays(permissionConfigs['buyer'])},
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
