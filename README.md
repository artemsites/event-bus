# A simple JavaScript event bus

## Documentation EventBus 

## Languages
### Russian https://github.com/artemsites/event-bus/blob/main/README.ru.md

EventBus is a lightweight implementation of the publish/subscribe event system designed for use in JavaScript applications.

## Creating an EventBus Instance

An `EventBus` instance is created inside the module file, so there is no need for manual instantiation. You simply import the instance and start using it:

```javascript
import eventBus from '/path/to/eventBus';
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

## Note on asynchrony
The queue (this.queue) in the event bus implementation, EventBus is used to store events that were generated ("emitted") before handlers were registered on them. This is a mechanism that provides asynchronous event handling and allows you to first generate an event and then subscribe to it.

When the emit method is called for an event for which there are currently no handlers, the event, along with its arguments, is queued. If a handler for this event subsequently appears (via calling the on method), it will immediately be called for each event in the queue that corresponds to the name of the event being subscribed, and the arguments passed when the event was generated will be passed to it.

In other words, this is a solution for situations where emit is called before on registers the handler. Without such a queue, events would simply be lost if they were generated before the handler was assigned.

After the handler is called for events from the queue, it is filtered to remove these events. This prevents the same handlers from being called again if they are added later.