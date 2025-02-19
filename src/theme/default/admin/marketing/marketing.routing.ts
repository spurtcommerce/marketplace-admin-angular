import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { MarketingLayoutComponent } from './components/layout/layout.component';
import { combineArrays, hasTrueValue, permissionConfigs } from '../shared/components/services/permission.constant';

const marketingRoutes: Routes = [
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: '',
    component: MarketingLayoutComponent,
    children: [
      {
        path: 'manage-promotions',
        loadChildren: () => import('./components/manage-promotions/manage-promotions.module').then(m => m.ManagePromotionsModule),
        canActivate: [AuthGuard],
        data: { permissionForRoot : combineArrays(permissionConfigs['marketing'])},
      },
      {
        path: 'manage-cross-selling',
        loadChildren: () => import('./components/manage-cross-selling/manage-cross-selling.module').then(m => m.ManageCrossSellingModule),
        canActivate: [AuthGuard],
        data: { permissionForRoot : combineArrays(permissionConfigs['relatedProduct'])},
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(marketingRoutes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'manage-promotions',
      isRouteAccess: arr(combineArrays(permissionConfigs['marketing'])),
      routePath: 'manage-promotions',
    },

    {
      permission: 'manage-cross-selling',
      isRouteAccess: arr(combineArrays(permissionConfigs['relatedProduct'])),
      routePath: 'manage-cross-selling',
    },
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect]?.routePath ?? routeVal ;
}