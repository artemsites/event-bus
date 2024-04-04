# EventBus Documentation

## Languages
### Russian https://github.com/artemsites/event-bus/blob/main/README.ru.md

EventBus is a lightweight implementation of the publish/subscribe event system designed for use in JavaScript applications.

## Creating an EventBus Instance

An `EventBus` instance is created inside the module file, so there is no need for manual instantiation. You simply import the instance and start using it:

```javascript
import eventBus from '/path/to/EventBus';
```

## Methods

### on(event, callback)

Subscribes a `callback` function to an `event`.

**Parameters:**

- `event` (String): The name of the event.
- `callback` (Function): The event handler to be called when the event is emitted.

**Example:**

```javascript
eventBus.on('message', function(data) {
  console.log('Event message received:', data);
});
```

### off(event, callback)

Unsubscribes a `callback` function from an `event`.

**Parameters:**

- `event` (String): The name of the event.
- `callback` (Function): The event handler that was previously subscribed.

**Example:**

```javascript
eventBus.off('message', messageHandler);
```

### emit(event, ...args)

Emits an `event`, passing all subsequent arguments to the subscribed callback functions (`callback`).

**Parameters:**

- `event` (String): The name of the event to emit.
- `...args`: Arguments that will be passed to the callback function.

**Example:**

```javascript
eventBus.emit('message', 'Hello, World!');
```

## Queue Handling

EventBus also incorporates a queuing mechanism for events that do not yet have a handler. When a handler subscribes to an event, all queued events matching that event are processed immediately.

```javascript
// Suppose the 'message' event is emitted, but no handler is subscribed yet
eventBus.emit('message', 'Delayed message');

// Now, once a handler is subscribed, it immediately processes the event from the queue
eventBus.on('message', function(data) {
  console.log('Event message received:', data);
});
```

Use `EventBus` with care to avoid memory leaks or unwarranted subscriptions, ensure you unsubscribe from events during cleanup or component unmounts.

## EventBus Instance Export

An `EventBus` instance is exported from the module to ensure a single instance is used throughout the application.

```javascript
export default eventBus;
```

Import this instance into any part of your application to emit and listen for events.