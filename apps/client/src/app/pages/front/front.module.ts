import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'



import { FrontPage } from './front.page'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FrontPage }]),
  ],
  declarations: [ FrontPage ],
  exports: [ FrontPage ],
})
export class FrontPageModule {}
