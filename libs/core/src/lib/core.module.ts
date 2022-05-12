import { NgModule } from '@angular/core'
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser'
import { PassiveEventPlugin } from './passive.event-plugin'

@NgModule({
  providers: [
    PassiveEventPlugin,
    {
      provide: EVENT_MANAGER_PLUGINS,
      useExisting: PassiveEventPlugin,
      multi: true,
    },
  ],
})
export class CoreModule { }
