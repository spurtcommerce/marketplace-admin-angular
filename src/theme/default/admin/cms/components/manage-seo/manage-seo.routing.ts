import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../../shared/components/services/permission.constant';

const manageSeoRoutes: Routes = [
  {
    path: '',
     redirectTo :routeDefaultRedirect() , pathMatch:'full'
   
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['products-seo'])},
  },

  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['CategorySeo'])},
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then(m => m.PageModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['pageSeo'])},

  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['blogSeo'])},
  },
  {
    path: 'sitemap',
    loadChildren: () => import('./site-map/site-map.module').then(m => m.SiteMapModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['siteMap'])},
  },
];


@NgModule({
  imports: [RouterModule.forChild(manageSeoRoutes)],
  exports: [RouterModule]
})
export class ManageSeoRoutingModule { }

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'product',
      isRouteAccess: arr(combineArrays(permissionConfigs['products-seo'])),
      routePath: 'product',
    },

    {
      permission: 'category',
      isRouteAccess: arr(combineArrays(permissionConfigs['CategorySeo'])),
      routePath: 'category',
    },
    {
      permission: 'page',
      isRouteAccess: arr(combineArrays(permissionConfigs['pageSeo'])),
      routePath: 'page',
    },
    {
      permission: 'blog',
      isRouteAccess: arr(combineArrays(permissionConfigs['blogSeo'])),
      routePath: 'blog',
    },
    {
      permission: 'sitemap',
      isRouteAccess: arr(combineArrays(permissionConfigs['siteMap'])),
      routePath: 'sitemap',
    },


  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect]?.routePath ?? routeVal;
}
