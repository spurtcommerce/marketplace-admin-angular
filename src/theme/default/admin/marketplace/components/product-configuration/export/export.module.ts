import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportRoutingModule } from './export-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { FromModuleComponent } from './from-module/from-module.component';
import { DataExportComponent } from './data-export/data-export.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    FromModuleComponent,
    DataExportComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ExportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    CKEditorModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    // EffectsModule.forFeature([

    // ]),
    NumberAcceptModule
  ]
})
export class ExportModule { }
