// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { ApprovedProductsComponent } from './approved-products/approved-products.component';
import { RejectedProductsComponent } from './rejected-products/rejected-products.component';
import { WaitingProductsComponent } from './waiting-products/waiting-products.component';
import { SellerProductsComponent } from './product/seller-products/seller-products.component';
// AuthGuard
import { AuthGuard } from '../../../../../../../src/core/admin/providers/auth.guard';
import { ProductAddComponent } from './product/product-detail/add.component';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../../shared/components/services/permission.constant';
import { VariantProductDetailComponent } from './product/variant-product-detail/variant-product-detail.component';
import { VariantProductComponent } from './product/variant-product/variant-product.component';

const manageProductsRoute: Routes = [
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },

  {
    path: 'seller-products', component: SellerProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'list-market-place-product',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'marketplace.common.AllProducts', url: '' },{ title: 'breadcrumbs.List', url: '' },
      ]
    }
  },
  {
    path: 'common-vendor-products',
    loadChildren: () => import('./common-vendor-product/common-vendor-product.module').then(m => m.CommonVendorProductModule),
    data: {
      permissionKey: 'common-catalog-product-list',
      permissionForRoot : combineArrays(permissionConfigs['common-product']),
    }
  },
  {
    path: 'approval', component: ApprovedProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'list-market-place-product',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'breadcrumbs.ApprovedProducts', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'Waiting', component: WaitingProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'list-market-place-product',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'marketplace.common.WaitingForApprovals', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'reject', component: RejectedProductsComponent,
    canActivate: [AuthGuard],
    data: {
      permissionKey: 'list-market-place-product',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' }, { title: 'breadcrumbs.Manage Products', url: '' },
      { title: 'breadcrumbs.RejectedProducts', url: '' },
      { title: 'breadcrumbs.List', url: '' }]
    }
  },

  {
    path: 'product-detail/:id', component: ProductAddComponent,
    canActivate: [AuthGuard],
    data: {

      permission: 'list-rejected-products',

      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/manage-products/' }, { title: 'breadcrumbs.Manage Products', url: '/vendors/manage-products' },
      { title: 'breadcrumbs.Products', url: '/vendors/manage-products' },
      { title: 'breadcrumbs.Details', url: '' }]
    }
  },



  {
    path: 'variant-product-detail/:id', component: VariantProductDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-rejected-products',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/manage-products/' }, { title: 'breadcrumbs.Manage Products', url: '/vendors/manage-products' },
      { title: 'breadcrumbs.Products', url: '/vendors/manage-products' },
      { title: 'breadcrumbs.Details', url: '' }]
    }
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(manageProductsRoute)],
  exports: [RouterModule]
})
export class ManageProductsRoutingModule { }
export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission:'seller-products',
      isRouteAccess: arr(['list-market-place-product']),
      routePath:'seller-products',
    },
    {
      permission: 'approval',
      isRouteAccess:arr(['list-market-place-product']),
      routePath: 'approval',
    },
    {
      permission: 'reject',
      isRouteAccess:arr(['list-market-place-product']),
      routePath: 'reject',
    },

    {
      permission: 'Waiting',
      isRouteAccess:arr(['list-market-place-product']),
      routePath: 'Waiting',
    },

    {
      permission: 'common-vendor-products',
      isRouteAccess: arr(['common-catalog-product-list']),
      routePath: 'common-vendor-products',
    },
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath ?? routeVal;
}