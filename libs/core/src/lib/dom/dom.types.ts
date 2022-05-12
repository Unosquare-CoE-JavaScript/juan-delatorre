import { InjectionToken } from "@angular/core"

export const URL_PREFIX = new InjectionToken<string>('Site wide URL prefix')
export const DEFAULT_METADATA = new InjectionToken<IPageMetadata>('Default website metadata')

// export type PreloadType = 'audio'| 'document'| 'embed'| 'fetch'| 'font'| 'image'| 'object'| 'script'| 'style'| 'track'| 'worker'| 'video'
export type PreloadImages = [ prefix: string, sizes: number[], suffix: string ]
export type PagePreloadImage<T extends PreloadImages> = [ name: string, defatultSize: number, resource: T ]

export interface IPageMetadata {
  title: string
  description: string
  keywords: string
  url: string
  image: string
  imageAlt: string
}

export interface IPageWithMetadata {
  metadata?: IPageMetadata
  preloadImages?: PagePreloadImage<PreloadImages>[]
}
