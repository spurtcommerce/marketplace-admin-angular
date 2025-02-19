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
import { PersonalizeLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { TranslateModule } from '@ngx-translate/core';
import { combineArrays, hasTrueValue, settings } from '../../../shared/components/services/permission.constant';

const Routers: Routes = [
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: '',
    component: PersonalizeLayoutComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('./product/personalize-product.module').then(m => m.PersonalizeProductModule),
        data: { permissionForRoot : combineArrays(settings.product)},
        canActivate: [AuthGuard],
      },
      {
        path: 'order',
        loadChildren: () => import('./order/personalize-order.module').then(m => m.PersonalizeOrderModule),
        data: { permissionForRoot : combineArrays(settings.order)},
        canActivate: [AuthGuard],
      },
      {
        path: 'email-template',
        loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailTemplateModule),
        data: { permissionForRoot : combineArrays(settings.emailTemplates)},
        canActivate: [AuthGuard],
      },
      {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
        data: { permissionForRoot : combineArrays(settings.socialMedia)},
        canActivate: [AuthGuard],
      }
    ]
  }
];
@NgModule({
  declarations: [PersonalizeLayoutComponent],
  imports: [RouterModule.forChild(Routers), ComponentsModule, NgbModule,TranslateModule.forChild()],
  providers: [],
  exports: [RouterModule]
})
export class PersonalizeModule { }
export function routeDefaultRedirect() {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [

    {
      permission:'product',
      isRouteAccess: arr(combineArrays(settings['product'])),
      routePath:'product',
    },
    {
      permission: 'order',
      isRouteAccess: arr(combineArrays(settings['order'])),
      routePath: 'order',
    },
    {
      permission: 'emailTemplates',
      isRouteAccess: arr(combineArrays(settings['emailTemplates'])),
      routePath: 'email-template',
    },
    {
      permission: 'socialMedia',
      isRouteAccess: arr(combineArrays(settings['socialMedia'])),
      routePath: 'social',
    },
  
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath;
}