// import helloWorldCommand from "./helloworld";
import randomMediaCommand from "./random-media";
import purrCommand from "./purr";


// Export all commands
const commands = {
    // helloWorldCommand,
    randomMediaCommand,
    purrCommand,
    [Symbol.iterator]: function* () {
        yield* Object.values(this);
    }
};

export default commands;
