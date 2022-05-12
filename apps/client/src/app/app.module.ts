import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'

import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'

import { AppComponent } from './app.component'
import { ErrorPageModule } from './pages/error/error.module'
import { ErrorPage } from './pages/error/error.page'
import { environment } from '../environments/environment'
import * as fromTask from './state/task/task.reducer'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/front/front.module').then((m) => m.FrontPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },

  { path: '**', component: ErrorPage, data: { error: 404 } },
]

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),

    MatTabsModule,
    MatToolbarModule,

    ErrorPageModule,

    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),

    EffectsModule.forRoot([]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    StoreRouterConnectingModule.forRoot(),

    StoreModule.forFeature(fromTask.tasksFeatureKey, fromTask.reducer),
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
