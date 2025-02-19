// angular imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// auth Guard 
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
// Components 
import { LayoutComponent } from './components/layout/layout.component';
import { PermissionComponent } from './components/permission/permission.component';
import { combineArrays, hasTrueValue, settings } from '../../../shared/components/services/permission.constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: routeDefaultRedirect(),
        pathMatch: 'full'
      },
      {
        path: 'role',
        loadChildren: () => import('./components/role/role.module').then(m => m.RoleModule),
        data: { permissionForRoot : combineArrays(settings.role)},
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
        data: { permissionForRoot : combineArrays(settings.user)},
        canActivate: [AuthGuard],
      },
      {
        path: 'permission',
        component: PermissionComponent,
        canActivate: [AuthGuard],
        data: { permissionKey: 'edit-role-permission' ,}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessPermissionRoutingModule { }
export function routeDefaultRedirect() {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [

    {
      permission:'role',
      isRouteAccess: arr(combineArrays(settings['role'])),
      routePath:'role',
    },
    {
      permission: 'user',
      isRouteAccess: arr(combineArrays(settings['user'])),
      routePath: 'user',
    },
  
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath;
}