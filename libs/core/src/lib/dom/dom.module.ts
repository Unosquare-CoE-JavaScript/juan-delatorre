import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DOMGuard } from './dom.guard'
import { DOMService } from './dom.service'

@NgModule({
  imports: [ BrowserModule ],
  providers: [
    DOMService,
    DOMGuard,
  ],
})
export class DOMModule { }
