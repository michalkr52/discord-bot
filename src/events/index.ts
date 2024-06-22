import readyEvent from "./ready";
import interactionCreateEvent from "./interaction-create";

// Export all events
const events = {
    readyEvent,
    interactionCreateEvent,
    [Symbol.iterator]: function* () {
        yield* Object.values(this);
    }
};

export default events;
