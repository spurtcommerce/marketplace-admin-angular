/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonLayoutComponent } from './layout/common/common.component';
import { AuthGuard } from '../../../core/admin/providers/auth.guard';
import { EditprofileComponent } from './layout/editprofile/editprofile.component';
import { AuthLayoutComponent } from './layout/auth/auth.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { SetPasswordComponent } from './authentication/set-password/set-password.component';
import { TokenExpireComponent } from './authentication/token-expire/token-expire.component';
import { TokenInvalidComponent } from './authentication/token-invalid/token-invalid.component';
import { chatConversationComponentRoutes } from '../../../../add-ons/add-ons.constant';
import { combineArrays, hasTrueValue, permissionConfigs, settings } from './shared/components/services/permission.constant';

export const appRoutes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
      {
        path: 'editprofile', component: EditprofileComponent, data: {
          urls: [{ title: 'breadcrumbs.Settings', url: '' },
          { title: 'breadcrumbs.Edit Profile', url: '' },
          ]
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'catalog',
        loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'seller',
        loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
        data: { permissionForRoot: combineArrays(permissionConfigs['seller'], permissionConfigs['sellerGroup'], permissionConfigs['kyc']) },
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: { permissionForRoot: combineArrays(permissionConfigs['settings']) },
        canActivate: [AuthGuard]
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
        data: { permissionForRoot: combineArrays(permissionConfigs['buyer']) },
        canActivate: [AuthGuard]
      },
      {
        path: 'cms',
        loadChildren: () => import('./cms/cms.module').then(m => m.CMSModule),
        data: {
          permissionForRoot: combineArrays(permissionConfigs['pages'], permissionConfigs['pagesGroup'], permissionConfigs['PromotionWidget'], permissionConfigs['questionAndAnswer']
            , permissionConfigs['RatingAndReview'], permissionConfigs['banners'], permissionConfigs['products-seo'], permissionConfigs['CategorySeo'], permissionConfigs['pageSeo'], permissionConfigs['blogSeo'], permissionConfigs['siteMap'], permissionConfigs['postAndcategory'])
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'marketing',
        loadChildren: () => import('./marketing/marketing.module').then(m => m.MarketingModule),
        data: { permissionForRoot: combineArrays(permissionConfigs['marketing'], permissionConfigs['relatedProduct']) },

        canActivate: [AuthGuard]
      },
      {
        path: 'change-password',
        loadChildren: () => import('./layout/changepassword/changepassword.module').then(m => m.ChangePasswordModule),
      },
      {
        path: 'vendors',
        loadChildren: () => import('./marketplace/marketplace.routing').then(m => m.VendorModule),
        data: {
          permissionForRoot: combineArrays(permissionConfigs['manage-product'], permissionConfigs['common-product'], permissionConfigs['categories'], permissionConfigs['product-qr']
            , permissionConfigs['order'], permissionConfigs['back-order']
            , permissionConfigs['failed-order'], permissionConfigs['payments']
            ,  permissionConfigs['abondonedlive']
            , permissionConfigs['settlement']
            , permissionConfigs['history'], permissionConfigs['reports']
          )
        },
        canActivate: [AuthGuard]
      },

      {
        path: 'support',
        loadChildren: () => import('./support/support.module').then(m => m.SupportModule),
        canActivate: [AuthGuard]
      },
      // add-ons seperation
      ...chatConversationComponentRoutes

    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
  },
  {
    path: 'token-expired',
    component: TokenExpireComponent
  },
  {
    path: 'invalid-token',
    component: TokenInvalidComponent
  },
  {
    path: 'error',
    loadChildren: () => import(`./error/error.module`).then(m => m.ErrorModule)

  },

  { path: '**', redirectTo: '/error/404' }
];



//chat add-ons push
// appRoutes[0].children?.push(chatRoutes[0])

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }



export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'customers',
      isRouteAccess: arr(combineArrays(permissionConfigs['buyer'])),
      routePath: 'customers',
    },

    {
      permission: 'cms',
      isRouteAccess: arr(combineArrays(permissionConfigs['pages'], permissionConfigs['pagesGroup'], permissionConfigs['PromotionWidget'],
        permissionConfigs['questionAndAnswer'], permissionConfigs['RatingAndReview'], permissionConfigs['banners'], permissionConfigs['products-seo'], permissionConfigs['CategorySeo'], permissionConfigs['pageSeo'], permissionConfigs['blogSeo'], permissionConfigs['siteMap'], permissionConfigs['postAndcategory'])),
      routePath: 'cms',
    },

    {
      permission: 'seller',
      isRouteAccess: arr(combineArrays(permissionConfigs['seller'], permissionConfigs['sellerGroup'], permissionConfigs['kyc'])),
      routePath: 'seller',
    },
    {
      permission: 'vendors',
      isRouteAccess: arr(combineArrays(permissionConfigs['manage-product'], permissionConfigs['common-product'], permissionConfigs['categories'], permissionConfigs['product-qr']
        , permissionConfigs['order'], permissionConfigs['back-order']
        , permissionConfigs['failed-order'], permissionConfigs['payments'],
        permissionConfigs['abondonedlive']
        , permissionConfigs['settlement']
        , permissionConfigs['history'], permissionConfigs['reports'])),
      routePath: 'vendors',
    },
    {
      permission: 'edit-general-settings',
      isRouteAccess: arr(combineArrays(settings['settings'])),
      routePath: 'settings',
    },
    {
      permission: 'marketing',
      isRouteAccess: arr(combineArrays(permissionConfigs['marketing'], permissionConfigs['relatedProduct'])),
      routePath: 'marketing',
    },

  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect]?.routePath ?? routeVal;
}