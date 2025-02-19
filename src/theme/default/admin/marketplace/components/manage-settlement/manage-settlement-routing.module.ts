import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineArrays, permissionConfigs } from '../../../shared/components/services/permission.constant';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';

const routes: Routes = [


  {path:'', redirectTo:'settlement',pathMatch:'full'},
 
  {
      path: 'settlement',
      loadChildren: () => import('./settlement/settlement.module').then(m => m.SettlementModule),
      canActivate: [AuthGuard],
      data: { permissionForRoot:combineArrays(permissionConfigs['settlement'],permissionConfigs['history']) },
      
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSettlementRoutingModule { }
