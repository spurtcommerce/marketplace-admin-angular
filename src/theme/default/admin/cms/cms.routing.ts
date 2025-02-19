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
import { CMSLayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { combineArrays, hasTrueValue, permissionConfigs } from '../shared/components/services/permission.constant';

const cmsRoutes: Routes = [
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: '',
    component: CMSLayoutComponent,
    children: [
      {
          path: 'manage-content',
          loadChildren: () => import('./components/manage-content/manage-content.module').then(m => m.ManageContentModule),
          canActivate: [AuthGuard],
          data: { permissionForRoot : combineArrays(permissionConfigs['pages'],permissionConfigs['pagesGroup'],permissionConfigs['PromotionWidget'],permissionConfigs['questionAndAnswer'],permissionConfigs['RatingAndReview'])},
      },
      {
        path: 'manage-banners',
        loadChildren: () => import('./components/manage-banners/manage-banners.module').then(m => m.ManageBannersModule),
        canActivate: [AuthGuard],
        data: { permissionForRoot : combineArrays(permissionConfigs['banners'])},
      },
      {
        path: 'manage-blogs',
        loadChildren: () => import('./components/manage-blogs/manage-blogs.module').then(m => m.ManageBlogsModule),
        canActivate: [AuthGuard],
        data:{ permissionForRoot : combineArrays(permissionConfigs['postAndcategory'])},
      },
      {
        path: 'manage-seo',
        loadChildren: () => import('./components/manage-seo/manage-seo.routing').then(m => m.ManageSeoRoutingModule),
        canActivate: [AuthGuard],
        data: { permissionForRoot : combineArrays(permissionConfigs['products-seo'],permissionConfigs['CategorySeo'],permissionConfigs['pageSeo'],permissionConfigs['blogSeo'],permissionConfigs['siteMap'],permissionConfigs['postAndcategory'])},
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cmsRoutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule {}

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'manage-content',
      isRouteAccess: arr(combineArrays(permissionConfigs['pages'],permissionConfigs['pagesGroup'],permissionConfigs['PromotionWidget'],permissionConfigs['questionAndAnswer'],permissionConfigs['RatingAndReview'])),
      routePath: 'manage-content',
    },

    {
      permission: 'manage-banners',
      isRouteAccess: arr(combineArrays(permissionConfigs['banners'])),
      routePath: 'manage-banners',
    },
    
    {
      permission: 'manage-seo',
      isRouteAccess: arr(combineArrays(permissionConfigs['products-seo'],permissionConfigs['CategorySeo'],permissionConfigs['pageSeo'],permissionConfigs['blogSeo'],permissionConfigs['siteMap'])),
      routePath: 'manage-seo',
    },
    
    {
      permission: 'manage-blogs',
      isRouteAccess: arr(combineArrays(permissionConfigs['postAndcategory'])),
      routePath: 'manage-blogs',
    },
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );

  return routeMatches[routeRedirect]?.routePath ?? routeVal ;
}
