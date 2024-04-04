function EventBus() {
  this.listeners = {}
  this.queue = []
}

EventBus.prototype.on = function (event, callback) {
  this.listeners[event] = this.listeners[event] || []
  this.listeners[event].push(callback)

  this.queue.forEach(function (queuedEvent) {
    if (queuedEvent.event === event) {
      setTimeout(function () {
        callback.apply(null, queuedEvent.args)
      }, 0)
    }
  })
  this.queue = this.queue.filter(function (queuedEvent) {
    return queuedEvent.event !== event
  })
}

EventBus.prototype.off = function (event, callback) {
  if (!this.listeners[event]) {
    return
  }
  this.listeners[event] = this.listeners[event].filter(function (listener) {
    return listener !== callback
  })
  if (this.listeners[event].length === 0) {
    delete this.listeners[event]
  }
}

EventBus.prototype.emit = function (event) {
  var args = Array.prototype.slice.call(arguments, 1)
  if (this.listeners[event]) {
    this.listeners[event].forEach(function (callback) {
      setTimeout(function () {
        callback.apply(null, args)
      }, 0)
    })
  } else {
    this.queue.push({ event: event, args: args })
  }
}

var eventBus = new EventBus()

export default eventBus
