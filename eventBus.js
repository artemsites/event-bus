class EventBus {
  constructor() {
    this.listeners = {}
    this.queue = []
  }

  on(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)

    this.queue.forEach((queuedEvent) => {
      if (queuedEvent.event === event) {
        setTimeout(() => {
          callback(...queuedEvent.args)
        }, 0)
      }
    })
    this.queue = this.queue.filter((queuedEvent) => queuedEvent.event !== event)
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
    if (this.listeners[event].length === 0) {
      delete this.listeners[event]
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        setTimeout(() => {
          callback(...args)
        }, 0)
      })
    } else {
      this.queue.push({ event: event, args })
    }
  }
}

const eventBus = new EventBus()

export default eventBus