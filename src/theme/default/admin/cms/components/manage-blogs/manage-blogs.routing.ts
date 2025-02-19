import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { categoriesComponentRoutes, postsComponentRoutes } from 'add-ons/add-ons.constant';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../../shared/components/services/permission.constant';


const manageBlogRoutes: Routes = [
  {path:'',redirectTo:routeDefaultRedirect(),pathMatch:'full'},
  {
    path:'posts',
    children:[
      ...postsComponentRoutes
    ]
  },
  {
    path:'categories',
    children:[
      ...categoriesComponentRoutes
    ]
  },
];
   
@NgModule({
  imports: [RouterModule.forChild(manageBlogRoutes)],
  exports: [RouterModule]
})
export class ManageBlogsRoutingModule { }

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'posts',
      isRouteAccess: arr(combineArrays(permissionConfigs['postAndcategory'])),
      routePath: 'posts',
    },

  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );

  return routeMatches[routeRedirect]?.routePath ?? routeVal ;
}

