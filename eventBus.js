class EventBus {
  constructor() {
    this.listeners = {}
    this.queue = []
  }

  on(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)

    this.queue = this.queue.filter(({ event: e, args }) => {
      if (e === event) {
        setTimeout(() => callback(...args), 0)
        return false
      }

      return true
    })
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
      if (!this.listeners[event].length) delete this.listeners[event]
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        setTimeout(() => callback(...args), 0);
      });
    } else {
      this.queue.push({ event, args });
    }
  }
}

const eventBus = new EventBus()

export default eventBus