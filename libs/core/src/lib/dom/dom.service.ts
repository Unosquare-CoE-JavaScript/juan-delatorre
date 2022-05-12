import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { IPageMetadata, PreloadImages, URL_PREFIX } from './dom.types'

@Injectable()
export class DOMService {
  private embedded: Map<string, boolean> = new Map
  private renderer: Renderer2

  constructor (
    rendererFactory: RendererFactory2,
    @Inject(URL_PREFIX) private urlPrefix: string,
    @Inject(DOCUMENT) private document: Document,
    private title: Title,
    private meta: Meta,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null)
  }

  embedScript (url: string): Promise<[string, Event]> {
    return new Promise(
      (resolve, reject) => {
        if(!this.embedded.has(url)) {
          const element: HTMLScriptElement = this.renderer.createElement('script')

          element.addEventListener('load', event => resolve([url, event]))

          element.setAttribute('crossorigin', '*')
          element.setAttribute('async', '')
          element.setAttribute('type', 'text/javascript')
          element.setAttribute('src', url)

          this.renderer.appendChild(this.document.body, element)
          this.embedded.set(url, true)
        } else {
          reject(`Script already loaded. (${ url })`)
        }
      },
    )
  }

  embedLD (type: string, content: Record<string, unknown>): HTMLScriptElement {
    const element: HTMLScriptElement = this.document.getElementById(`metadata-${type}`) ?? this.renderer.createElement('script')
    if(!element.getAttribute('type')) {
      element.setAttribute('id', `metadata-${type}`)
      element.setAttribute('type', 'application/ld+json')
      this.renderer.appendChild(this.document.head, element)
    }

    element.innerHTML = JSON.stringify({ '@context': 'https://schema.org/', type, ...content }, null, 2)
    return element
  }

  addPreloadSrcSet <T extends PreloadImages> (name: string, defaultSize: number, resource: T) {
    const element: HTMLScriptElement = this.document.getElementById(`preload-${name}`) ?? this.renderer.createElement('link')
    const [ prefix, sizes, suffix ] = resource

    element.setAttribute('href', `${prefix}${defaultSize}${suffix}`)
    element.setAttribute('imagesizes', `(max-width: ${defaultSize}px) 100vw ${defaultSize}px`)
    element.setAttribute('imagesrcset', sizes.map((size) => `${prefix}${size}${suffix} ${size}w`).join(', '))

    if (!element.getAttribute('as')) {
      element.setAttribute('rel', 'preload')
      element.setAttribute('as', 'image')
      this.renderer.appendChild(this.document.head, element)
    }
  }

  addOpenGraph (prefix: string, data: Partial<IPageMetadata>): Array<HTMLMetaElement> {
    const extra: Record<string, string> = prefix === 'og'
      ? { type: 'website', site_name: 'Litecon' }
      : { card: 'summary' }
    data.url && (extra.url = data.url)

    return Object.entries({ ...extra, ...data }).map(
      ([key, content]) =>
        this.meta.updateTag({
          property: `${prefix}:${key.replace(/[A-Z]/g, _ => `:${_.toLowerCase()}`)}`,
          content,
        }) as HTMLMetaElement,
    )
  }

  setMetadata ({ title, description, keywords, url, image, imageAlt }: IPageMetadata) {
    url = `${this.urlPrefix}${url}`

    this.title.setTitle(title)
    this.meta.updateTag({ name: 'description', content: description })
    this.meta.updateTag({ name: 'keywords', content: keywords })

    this.addOpenGraph('og', { title, description, url, image, imageAlt })
    this.addOpenGraph('twitter', { title, description, image, imageAlt })
    this.embedLD('website', { name: title, description, url, image })
  }
}
