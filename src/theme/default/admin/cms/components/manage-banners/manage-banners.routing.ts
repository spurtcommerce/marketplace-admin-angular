import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { combineArrays, permissionConfigs } from '../../../shared/components/services/permission.constant';

const routes: Routes = [
  { path: '', redirectTo: 'banners', pathMatch: 'full' },
  {
        path: 'banners',
        loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule),
        canActivate: [AuthGuard],
        data: { permissionForRoot : combineArrays(permissionConfigs['banners'])},
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBannersRoutingModule { }
