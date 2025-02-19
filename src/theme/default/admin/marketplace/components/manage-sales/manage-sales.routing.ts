import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BackOrdersComponent } from './back-orders/back-orders.component';
import { FailedOrdersComponent } from './failed-orders/failed-orders.component';
import { FailedOrderModalComponent } from './failed-order-model/failed-order-model.component';
import { ViewFailedOrdersComponent } from './view-failed-orders/vieworders.component';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../../shared/components/services/permission.constant';

// Auth Guard
import { AuthGuard } from '../../../../../../../src/core/admin/providers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.VendorSalesModule),
    data: { root: 'marketplace-new', permissionForHeader: 'product-order' }
  },
  {
    path: 'back-orders', component: BackOrdersComponent, canActivate: [AuthGuard],
    data: {
      permissionKey: 'back-order-list',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Sales', url: '' },
      { title: 'breadcrumbs.Back Orders', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    },
  },
  {
    path: 'failed-orders', component: FailedOrdersComponent, canActivate: [AuthGuard],
    data: {
      permissionKey: 'failed-order-list',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Sales', url: '' },
      { title: 'breadcrumbs.Falied Orders', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    },
  },
  {
    path: 'failed-orders-detail/:orderId', component: ViewFailedOrdersComponent, canActivate: [AuthGuard],
    data: {
      permissionKey: 'view-failed-order-detail',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/manage-sales/failed-orders' }, { title: 'breadcrumbs.Manage Sales', url: '/vendors/manage-sales/failed-orders' },
      { title: 'breadcrumbs.Falied Orders', url: '/vendors/manage-sales/failed-orders' },
      { title: 'breadcrumbs.Details', url: '' }]
    },
  },

  {
    path: 'payment',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentModule),
    data: { permissionForRoot : combineArrays(permissionConfigs['payments'])},
    },
 
  {
    path: 'abandoned',
    loadChildren: () => import('./abondoned/abondoned.module').then(m => m.AbondonedModule),
    data: { permissionForRoot : combineArrays( permissionConfigs['abondonedlive'])},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSalesRoutingModule { }

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'sales',
      isRouteAccess: arr(combineArrays(permissionConfigs['order'])),
      routePath: 'sales',
    },
    {
      permission: 'back-orders',
      isRouteAccess: arr(combineArrays(permissionConfigs['back-order'])),
      routePath: 'back-orders',
    },
    {
      permission: 'failed-orders',
      isRouteAccess: arr(combineArrays(permissionConfigs['failed-order'])),
      routePath: 'failed-orders',
    },
    {
      permission: 'payment',
      isRouteAccess: arr(combineArrays(permissionConfigs['payments'])),
      routePath: 'payment',
    },
    {
      permission: 'abandoned',
      isRouteAccess: arr(combineArrays(( permissionConfigs['abondonedlive']))),
      routePath: 'abandoned',
    },
    
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath ?? routeVal;
}