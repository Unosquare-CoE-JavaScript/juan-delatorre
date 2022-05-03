
export type LifeCycleEventHandler = (shutdownSignal?: string) => false | void

export enum LifeCycleEvents {
  'init'           = 'init'          , // onModuleInit              | Host dependencies resolved
  'bootstrap'      = 'bootstrap'     , // onApplicationBootstrap    | All modules initialized
  'destroy'        = 'destroy'       , // onModuleDestroy           | Termination signal received
  'beforeShutdown' = 'beforeShutdown', // beforeApplicationShutdown | onModuleDestroy handlers completed
  'shutdown'       = 'shutdown'      , // onApplicationShutdown     | All connections closed
}
