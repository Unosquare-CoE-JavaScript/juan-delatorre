import { Component, OnInit } from '@angular/core'
import { IPageMetadata, IPageWithMetadata, PagePreloadImage, PreloadImages } from './dom.types'

@Component({
  template: ''
})
export class BasePageComponent implements IPageWithMetadata, OnInit {
  metadata?: IPageMetadata
  preloadImages?: PagePreloadImage<PreloadImages>[]

  ngOnInit() {
    void 0
  }
}
