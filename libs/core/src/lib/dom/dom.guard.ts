import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router'


import { DOMService } from './dom.service'
import { DEFAULT_METADATA, IPageMetadata, IPageWithMetadata } from './dom.types'

@Injectable()
export class DOMGuard implements CanActivateChild {
  constructor (
    private dom: DOMService,
    @Inject(DEFAULT_METADATA) private defaultMetadata: IPageMetadata,
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot) {
    const { component } = route

    if (component && typeof component !== 'string') {
      const { metadata, preloadImages } = component as IPageWithMetadata
      this.dom.setMetadata(metadata || this.defaultMetadata)

      if (preloadImages) {
        preloadImages.forEach(([name, defaultSize, resource]) =>
          this.dom.addPreloadSrcSet(name, defaultSize, resource),
        )
      }
    }

    return true
  }
}
