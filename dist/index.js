#!/usr/bin/env node
import { CLI } from "./CLI/index.js";
import { DbJson } from "./database/index.js";
class TaskTracker {
    static async init() {
        try {
            const taskCli = new CLI();
            const db = new DbJson();
            db.init();
            await taskCli.start();
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.name} // ${error.message}`);
            }
        }
    }
}
await TaskTracker.init();
//# sourceMappingURL=index.js.map