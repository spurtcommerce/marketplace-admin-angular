import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../shared/components/services/permission.constant';

const routes: Routes = [
  { path: '', redirectTo: 'seller', pathMatch: 'full' },
  {
    path: 'seller',
    loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule),
    data: { permissionForRoot: combineArrays(permissionConfigs['seller'],permissionConfigs['sellerGroup'],permissionConfigs['kyc']) },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVendorsRoutingModule { }

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [


    {
      permission: 'seller',
      isRouteAccess: arr(combineArrays(permissionConfigs['seller'], permissionConfigs['sellerGroup'], permissionConfigs['kyc'])),
      routePath: 'seller',
    },


  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect]?.routePath ?? routeVal;
}