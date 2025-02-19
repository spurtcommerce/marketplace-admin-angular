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
import { VendorLayoutComponent } from './components/layout/vendor-layout.component';
import { ComponentsModule } from '../shared/components';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { combineArrays, hasTrueValue, permissionConfigs } from '../shared/components/services/permission.constant';


const routes: Routes = [
  {
    path: '',
    component: HeaderLayoutComponent,
    children: [
      { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },

      {
        path: 'manage-products',
        loadChildren: () => import('./components/manage-products/manage-products.module').then(m => m.ManageProductsModule),
        canActivate: [AuthGuard],
        data: {  permissionForRoot : combineArrays(permissionConfigs['manage-product'],permissionConfigs['common-product'])}
      },
      {
        path: 'product-config',
        loadChildren: () => import('./components/product-configuration/product-configuration.module').then(m => m.ProductConfigurationModule),
        data: {  permissionForRoot : combineArrays(permissionConfigs['categories'],permissionConfigs['product-qr'])},
        canActivate: [AuthGuard]
      },
      
      {
        path: 'manage-sales',
        loadChildren: () => import('./components/manage-sales/manage-sales.module').then(m => m.ManageSalesModule),
        data: {  permissionForRoot : combineArrays(permissionConfigs['order'],permissionConfigs['back-order']
          ,permissionConfigs['failed-order'],permissionConfigs['payments']
          , permissionConfigs['abondonedlive'])},
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-settlement',
        loadChildren: () => import('./components/manage-settlement/manage-settlement.module').then(m => m.ManageSettlementModule),
        data: { permissionForRoot:combineArrays(permissionConfigs['settlement'],permissionConfigs['history']) },
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        loadChildren: () => import('./components/reports/reports.module').then(m => m.ReportsModule),
        data: { permissionForRoot: combineArrays(permissionConfigs['reports'])},
        canActivate: [AuthGuard]
      }
    ]
  },
];
@NgModule({
    declarations: [
        VendorLayoutComponent
    ],
    imports: [RouterModule.forChild(routes), CommonModule, NgbModule, ComponentsModule],
    providers: [],
    bootstrap: []
})
export class VendorModule {}
export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'manage-products',
      isRouteAccess:arr(combineArrays(permissionConfigs['manage-product'],permissionConfigs['common-product'])),
      routePath: 'manage-products',
    },
    {
      permission: 'product-config',
      isRouteAccess:arr(combineArrays(permissionConfigs['categories'],permissionConfigs['data-export'],permissionConfigs['product-qr'])),
      routePath: 'product-config',
    },
    {
      permission: 'manage-sales',
      isRouteAccess:arr(combineArrays(permissionConfigs['order'],permissionConfigs['back-order']
        ,permissionConfigs['failed-order'],permissionConfigs['payments']
        , permissionConfigs['abondonedlive'])),
      routePath: 'manage-sales',
    },
    {
      permission: 'manage-settlement',
      isRouteAccess:arr(combineArrays(permissionConfigs['settlement'],permissionConfigs['history'])),
      routePath: 'manage-settlement',
    },
    {
      permission: 'reports',
      isRouteAccess:arr(combineArrays(permissionConfigs['reports'])),
      routePath: 'reports',
    }
    
  ]; 

  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath ?? routeVal;
}