
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import helmet from 'helmet'
import * as csurf from 'csurf'
import * as session from 'express-session'

import { Low, JSONFile } from 'lowdb'
import LowDBStore from 'connect-lowdb'

import { AppModule } from './app/app.module'
import { ApplicationOptions } from './types'

async function bootstrap({ prefix, port, secrets }: ApplicationOptions) {
  const app = await NestFactory.create(AppModule, { cors: true })
  const Store = LowDBStore(session)

  app
    .setGlobalPrefix(prefix)
    .use(helmet())
    .use(
      session({
        store: new Store({ db: new Low(new JSONFile('../../../database/session.json')) }),
        secret: secrets.get('session'),
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
      }),
    )
    .use(csurf({ cookie: true }))
    .enableShutdownHooks()

  return app.listen(port)
}

const config: ApplicationOptions = {
  port: Number(process.env.PORT || 3334),
  prefix: 'api',
  secrets: new Map([
    [ 'session', 'secret' ]
  ]),
}

bootstrap(config)
.then(() => Logger.log(`🚀 Application is running on: http://localhost:${config.port}/${config.prefix}`))
.catch(reason => Logger.log(`Error listening: ${reason}`))
