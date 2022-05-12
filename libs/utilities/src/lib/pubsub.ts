
export type SubscriberHandler = (...parameters: unknown[]) => false | void

export class PubSub {
  private subscribers: Record<string, Record<symbol, SubscriberHandler>> = {}

  subscribe (subject: string, subscriber: SubscriberHandler): symbol {
    if (!(subject in this.subscribers)) {
      this.subscribers[subject] = {}
    }

    const key = Symbol(subject)
    this.subscribers[subject][key] = subscriber
    return key
  }

  publish (subject: string, ...message: unknown[]) {
    if (subject in this.subscribers) {
      Object.entries<SubscriberHandler>(this.subscribers[subject])
        .forEach(([key, subscriber]) => {
          if (!subscriber(...message)) {
            delete this.subscribers[subject][key as unknown as symbol]
          }
        })
    }
  }

  unsubscribe (subject: string, key: symbol) {
    if (subject in this.subscribers) {
      delete this.subscribers[subject][key]
    }
  }
}
