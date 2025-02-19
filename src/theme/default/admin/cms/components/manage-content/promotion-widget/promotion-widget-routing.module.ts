import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { promotionWidgetComponentRoutes } from 'add-ons/add-ons.constant';
const routes: Routes = [...promotionWidgetComponentRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionWidgetRoutingModule { }
