import { Module } from '@nestjs/common'
import { EnvironmentService } from './environment/environment.service'
import { LifeCycleService } from './life-cycle/life-cycle.service'

@Module({
  providers: [
    EnvironmentService,
    LifeCycleService,
  ],
})
export class CoreModule {}
