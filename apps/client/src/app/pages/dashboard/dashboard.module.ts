import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import {MatInputModule} from '@angular/material/input'

import { DashboardPageComponent } from './dashboard.page'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashboardPageComponent }]),
    MatInputModule,
  ],
  declarations: [ DashboardPageComponent ],
  exports: [ DashboardPageComponent ],
})
export class DashboardPageModule {}
