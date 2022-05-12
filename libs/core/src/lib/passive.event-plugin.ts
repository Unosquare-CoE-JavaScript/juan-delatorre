import { Injectable } from '@angular/core'

@Injectable()
export class PassiveEventPlugin {
  supports (eventName: string): boolean {
    return eventName.split('.').includes('passive')
  }

  addEventListener (element: HTMLElement, eventName: string, handler: EventListener) {
    const [event] = eventName.split('.')
    element.addEventListener(event, handler, { passive: true })

    return () => element.removeEventListener(event, handler)
  }
}
