import helloWorldCommand from "./helloworld";
import randomMediaCommand from "./random-media";


// Export all commands
const commands = {
    helloWorldCommand,
    randomMediaCommand,
    [Symbol.iterator]: function* () {
        yield* Object.values(this);
    }
};

export default commands;
