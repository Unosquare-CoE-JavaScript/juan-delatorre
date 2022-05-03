import { BeforeApplicationShutdown, Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { randomNumber } from '@jp/utilities'

import { LifeCycleEventHandler, LifeCycleEvents } from '../types'

@Injectable()
export class LifeCycleService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  private subscribers: Record<LifeCycleEvents, Map<number, LifeCycleEventHandler>> = {
    init: new Map,
    bootstrap: new Map,

    destroy: new Map,
    beforeShutdown: new Map,
    shutdown: new Map,
  }

  registerSubscriber (event: LifeCycleEvents, handler: LifeCycleEventHandler) {
    const list = this.subscribers[event]
    const uid = randomNumber(4)

    list.set(uid, handler)

    return uid
  }

  onModuleInit() {
    this.subscribers.init.forEach(handler => handler())
  }

  onApplicationBootstrap () {
    this.subscribers.bootstrap.forEach(handler => handler())
  }

  onModuleDestroy() {
    this.subscribers.destroy.forEach(handler => handler())
  }

  beforeApplicationShutdown(signal?: string) {
    this.subscribers.beforeShutdown.forEach(handler => handler(signal))
  }

  onApplicationShutdown (signal?: string) {
    this.subscribers.shutdown.forEach(handler => handler(signal))
  }
}
