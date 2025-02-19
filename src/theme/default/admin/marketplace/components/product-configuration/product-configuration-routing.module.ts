import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { BulkProductUploadComponent } from '../../../catalog/components/import/import-products/bulk-product-upload.component';
import { DataImportComponent } from '../../../catalog/components/import/data-import/data-import.component';
import { UploadFileComponent } from '../../../catalog/components/import/upload-file/upload-file.component';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../../shared/components/services/permission.constant';


const routes: Routes = [
  // <! ----------------------- categories --------------------------- !>
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AuthGuard],
    data: {  permissionForRoot : combineArrays(permissionConfigs['categories'])}

  },
    // export 
  {
    path: 'export',
    loadChildren: () => import('./export/export.module').then(m => m.ExportModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['categories'])},
  },
  // Bulk Product Imports

  {
    path: 'import-products', component: BulkProductUploadComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Products Mapping', url: '' }]
    }
  },
  // Bulk Product Mapping
  {
    path: 'data-import', component: DataImportComponent,
    canActivate: [AuthGuard],
    data: {
      
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Import Mapping', url: '' }]
    }
  },
  {
    path: 'upload-file', component: UploadFileComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'breadcrumbs.Catalog', url: '' },
      { title: 'breadcrumbs.Manage Imports', url: '' },
      { title: 'breadcrumbs.Bulk Import Mapping', url: '' },
      { title: 'breadcrumbs.Upload File', url: '' }]
    }
  },
  {
    path: 'product_variant',
    loadChildren: () => import('./variant/variant.module').then(m => m.VariantModule)
  },

  {
    path: 'product-qr',
    loadChildren: () => import('./product-qr/product-qr.module').then(m => m.ProductQrModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['product-qr'])},
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductConfigurationRoutingModule { }
export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'categories',
      isRouteAccess: arr(combineArrays(permissionConfigs['categories'])),
      routePath: 'categories',
    },
    {
      permission: 'export',
      isRouteAccess: arr(combineArrays(permissionConfigs['categories'])),
      routePath: 'export',
    },
    {
      permission: 'product-qr',
      isRouteAccess: arr(combineArrays(permissionConfigs['product-qr'])),
      routePath: 'product-qr',
    },
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );
  return routeMatches[routeRedirect].routePath ?? routeVal;
}