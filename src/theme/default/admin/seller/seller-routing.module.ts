import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { combineArrays, hasTrueValue, permissionConfigs } from '../shared/components/services/permission.constant';

const routes: Routes = [ 
{
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },

    {
      path: 'manage-seller',
      loadChildren: () => import('./manage-vendors/manage-vendors.module').then(m => m.ManageVendorsModule),
      canActivate: [AuthGuard],
      data: { permissionForRoot: combineArrays(permissionConfigs['seller'], permissionConfigs['sellerGroup'], permissionConfigs['kyc']) },

    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'manage-seller',
      isRouteAccess: arr(combineArrays(permissionConfigs['seller'], permissionConfigs['sellerGroup'], permissionConfigs['kyc'])),
      routePath: 'manage-seller',
    },
    ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect]?.routePath ?? routeVal;
}