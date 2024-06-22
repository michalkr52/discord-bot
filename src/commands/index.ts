import helloWorldCommand from "./helloworld";

// Export all commands
const commands = {
    helloWorldCommand,
    [Symbol.iterator]: function* () {
        yield* Object.values(this);
    }
};

export default commands;
