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
// Component
import { SettingsLayoutComponent } from './components/layout/layout.component';
import { PermissionComponent } from './components/access-permission/components/permission/permission.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { combineArrays, settings } from '../shared/components/services/permission.constant';


const settingsRoutes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: 'settings',
    component: SettingsComponent 
  },
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      {
        path: 'access-and-permission',
        loadChildren: () => import('./components/access-permission/access-permission.module').then(m => m.AccessPermissionModule),
        data: { permissionForRoot : combineArrays(settings.user,settings.role)},
        canActivate: [AuthGuard],
      },

      {
        path: 'generalsetting',
        loadChildren: () => import('./components/generalsettings/generalsettings.module').then(m => m.GeneralSettingsModule),
        canActivate: [AuthGuard],

      },
      {
        path: 'sitesettings',
        loadChildren: () => import('./components/system/sitesettings.module').then(m => m.SiteSettingsModule),
        data: { permissionForRoot : combineArrays(settings.system)},
        canActivate: [AuthGuard],
      },
      {
        path: 'site-settings',
        loadChildren: () => import('./components/site-settings/site-settings.module').then(m => m.SiteSettingsModule),
        data: { permissionForRoot : combineArrays(settings.seo)},
        canActivate: [AuthGuard],
      },
      {
        path: 'personalize',
        loadChildren: () => import('./components/personalize/personalize.module').then(m => m.PersonalizeModule),
        data: { permissionForRoot : combineArrays(settings.product,settings.order,settings.emailTemplates,settings.socialMedia)},
        canActivate: [AuthGuard],
      },

      {
        path: 'local',
        loadChildren: () => import('./components/localizations/localization.module').then(m => m.LocalizationModule),
        data: { permissionForRoot : combineArrays(settings.country,settings.zone,settings.language,settings.currency,settings.tax)},
        canActivate: [AuthGuard],

      },
      {
        path: 'order-fullfillment',
        loadChildren: () => import('./components/order-fullfillment-status/order-fullfillment-status.module').then(m => m.OrderFullfillmentStatusModule),
        data: { permissionForRoot : combineArrays(settings.manageOrderStatus)},
        canActivate: [AuthGuard],

      },
      {
        path: 'add-on',
        loadChildren: () => import('./components/addon/addon.module').then(m => m.AddonModule),
        data: { permissionForRoot : combineArrays(settings.addOns,settings.attribute,settings.variant)},
        canActivate: [AuthGuard],

      },
      {
        path: 'multiple-websites',
        loadChildren: () => import('./components/multiple-websites/multiple-websites.module').then(m => m.MultipleWebsitesModule),
        data: { permissionForRoot : combineArrays(settings.storeSettings)},
        canActivate: [AuthGuard],

      },
      

    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
