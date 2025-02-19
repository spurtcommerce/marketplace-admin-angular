import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { FromModuleComponent } from './from-module/from-module.component';
import { DataExportComponent } from './data-export/data-export.component';

const routes: Routes = [
  { path: '', redirectTo: 'export-data',pathMatch:"full" },
  {
    path: 'export-data', component: DataExportComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
      { title: 'Product Configuration', url: '' },
      { title: 'common.DataExport', url: '' }]
    }
  },
  {
    path: 'from-module', component: FromModuleComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Marketplace', url: '/vendors/product-config/export/export-data' },
      { title: 'Product Configuration', url: '/vendors/product-config/export/export-data' },
      { title: 'common.DataExport', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
