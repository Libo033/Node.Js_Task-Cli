import fs from "fs";
import { DbJson } from "../database/index.js";
export default class Task {
    db = new DbJson();
    async create(description) {
        if (description.length === 0) {
            let descError = new Error();
            descError.name = "NO_DESCRIPTION_ADDED";
            descError.message = "You need a description for your new task";
            throw descError;
        }
        const newTask = {
            id: 1,
            description: description,
            status: "todo",
            createdAt: new Date().toLocaleString(),
            updatedAt: null,
        };
        // GET LIST COMMAND
        let savedTasks = JSON.parse(fs.readFileSync(this.db.getDbPath(), "utf-8"));
        savedTasks.push(newTask);
        fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));
        console.log(`Task created successfully with ID ${newTask.id}`);
    }
}
//# sourceMappingURL=index.js.map