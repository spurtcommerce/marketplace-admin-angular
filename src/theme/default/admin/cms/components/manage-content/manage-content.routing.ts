import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { promotionWidgetComponentRoutes } from 'add-ons/add-ons.constant';
import { combineArrays, hasTrueValue, permissionConfigs } from '../../../shared/components/services/permission.constant';

const manageContentRoutes: Routes = [
  { path: '', redirectTo: routeDefaultRedirect(), pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['pages'])},
  },
  {
    path: 'page-group',
    loadChildren: () => import('./page-group/page-group.module').then(m => m.PageGroupModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['pagesGroup'])},
  },
  {
    path: 'promotion-widget',
    loadChildren: () => import('./promotion-widget/promotion-widget.module').then(m => m.PromotionWidgetModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['PromotionWidget'])},
  },
  {
    path: 'question-answer',
    loadChildren: () => import('./question-and-answer/question-and-answer.module').then(m => m.QuestionAndAnswerModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['questionAndAnswer'])},
  },
  {
    path: 'rating-review',
    loadChildren: () => import('./rating-and-review/rating-and-review.module').then(m => m.RatingAndReviewModule),
    canActivate: [AuthGuard],
    data: { permissionForRoot : combineArrays(permissionConfigs['RatingAndReview'])},
  },

...promotionWidgetComponentRoutes
];

@NgModule({
  imports: [RouterModule.forChild(manageContentRoutes)],
  exports: [RouterModule]
})
export class ManageContentRoutingModule { }

export function routeDefaultRedirect(routeVal: any = 'dashboard') {
  const arr = (permissionForRoot) => (permissionForRoot.length > 0 && hasTrueValue(permissionForRoot));

  const routeMatches: any = [
    {
      permission: 'pages',
      isRouteAccess: arr(combineArrays(permissionConfigs['pages'])),
      routePath: 'pages',
    },

    {
      permission: 'page-group',
      isRouteAccess: arr(combineArrays(permissionConfigs['pagesGroup'])),
      routePath: 'page-group',
    },

    {
      permission: 'promotion-widget',
      isRouteAccess: arr(combineArrays(permissionConfigs['PromotionWidget'])),
      routePath: 'promotion-widget',
    },

    {
      permission: 'question-answer',
      isRouteAccess: arr(combineArrays(permissionConfigs['questionAndAnswer'])),
      routePath: 'question-answer',
    },
    {
      permission: 'rating-review',
      isRouteAccess: arr(combineArrays(permissionConfigs['RatingAndReview'])),
      routePath: 'rating-review',
    },
    
  ];
  const routeRedirect: any = routeMatches.findIndex(
    (val: any) => val.isRouteAccess
  );

  return routeMatches[routeRedirect]?.routePath ?? routeVal ;
}
