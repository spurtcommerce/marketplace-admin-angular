/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// component 
import { LocalizationLayoutComponent } from './layout/layout.component';
// modules from third parties 
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../admin.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
// custom modules 
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

import { combineArrays, hasTrueValue, settings } from '../../../shared/components/services/permission.constant';

const Routers: Routes = [
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: '',
    component: LocalizationLayoutComponent,
    children: [
      {
        path: 'language',
        loadChildren: () => import('./languages/languages.module').then(m => m.LanguagesModule),
        data: { permissionForRoot : combineArrays(settings.language)},
        canActivate: [AuthGuard],
      },

      {
        path: 'order-status',
        loadChildren: () => import('./orderstatus/orderstatus.module').then(m => m.OrderStatusModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'list-order-status', root: 'settingsLocal' }
      },
      {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
        data: { permissionForRoot : combineArrays(settings.country)},
        canActivate: [AuthGuard],
      },
      {
        path: 'zone',
        loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule),
        data: { permissionForRoot : combineArrays(settings.zone)},
        canActivate: [AuthGuard],
      },
      {
        path: 'currency',
        loadChildren: () => import('./currencies/currency.module').then(m => m.CurrencyModule),
        data: { permissionForRoot : combineArrays(settings.currency)},
        canActivate: [AuthGuard],
      },
      {
        path: 'tax',
        loadChildren: () => import('./tax/tax.module').then(m => m.TaxModule),
        data: { permissionForRoot : combineArrays(settings.tax)},
        canActivate: [AuthGuard],
      }, 
    ]
  }
];
@NgModule({
  declarations: [LocalizationLayoutComponent],
  imports: [RouterModule.forChild(Routers), ComponentsModule, CommonModule, NgbModule, TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }), ],
  providers: [],
  exports: [RouterModule]
})
export class LocalizationModule { }
export function routeDefaultRedirect() {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [

    {
      permission: 'country',
      isRouteAccess: arr(combineArrays(settings['country'])),
      routePath: 'countries',
    },
    {
      permission:'language',
      isRouteAccess: arr(combineArrays(settings['language'])),
      routePath:'language',
    },
 
    {
      permission: 'zone',
      isRouteAccess: arr(combineArrays(settings['zone'])),
      routePath: 'zone',
    },
    {
      permission: 'currency',
      isRouteAccess: arr(combineArrays(settings['currency'])),
      routePath: 'currency',
    },
    {
      permission: 'tax',
      isRouteAccess: arr(combineArrays(settings['tax'])),
      routePath: 'tax',
    },
  
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath;
}