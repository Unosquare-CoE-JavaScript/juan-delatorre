## Features
- Dashboard has access to API that modifies data
- Websockets for Client API consumption
- Client has access only to read-only API
- TypeORM (or some other ORM)
- Authentication and JWT for session persistance
- Library has separate modules for each: (tree shakeable)
  - component (SCAM)
  - directive (SDAM)
  - Pipe (SPAM)
- Web workers
- Manifest

## Tools
- OpenAPI navigator (Swagger)
- Component library navigator (Storybook)
- E2E tests (Cypress)
- Component documentation (Compodoc)
- Design system (Stencil)
  - Atomic design
  - http://atomicdocs.io/
  - https://docs.catalog.style/
  - https://stenciljs.com/
- Code coverage
- Dep graphs
- Health checks
- Security audits

## Nest Life Cycle events

Event | Description
-- | --
onModuleInit()              | Host module's dependencies were resolved
onApplicationBootstrap()    | All modules were initialized (before listening for connections)
onModuleDestroy()           | Termination signal was received or app.close was called
beforeApplicationShutdown() | All onModuleDestroy() handlers were completed (before app.close runs)
onApplicationShutdown()     | All connections were closed (app.close resolves)
