import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { combineArrays, settings } from '../../../shared/components/services/permission.constant';


const Routers: Routes = [
  { path: '', redirectTo: 'seo', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'seo',
        loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule),
        data: { permissionForRoot : combineArrays(settings.seo)},
        canActivate: [AuthGuard],
      },
      {
        path: 'social',
        loadChildren: () => import('../personalize/social/social.module').then(m => m.SocialModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'settings-site-social', root: 'settings' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(Routers)],
  exports: [RouterModule]
})
export class SiteSettingsRoutingModule { }
