import { BeforeApplicationShutdown, Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PubSub } from '@jp/utilities'

import { LifeCycleEvents } from '../types'

@Injectable()
export class LifeCycleService extends PubSub implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  onModuleInit () {
    this.publish(LifeCycleEvents.init)
  }

  onApplicationBootstrap () {
    this.publish(LifeCycleEvents.bootstrap)
  }

  onModuleDestroy () {
    this.publish(LifeCycleEvents.destroy)
  }

  beforeApplicationShutdown (signal?: string) {
    this.publish(LifeCycleEvents.beforeShutdown, signal)
  }

  onApplicationShutdown (signal?: string) {
    this.publish(LifeCycleEvents.shutdown, signal)
  }
}
