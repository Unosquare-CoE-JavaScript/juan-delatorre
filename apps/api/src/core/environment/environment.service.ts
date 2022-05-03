import { Injectable } from '@nestjs/common'

@Injectable()
export class EnvironmentService {
  isTestingEnvironment () {
    return !!process.env.JEST_WORKER_ID
  }
}
