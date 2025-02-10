import fs from "fs";
import Task from "../index.js";
class TaskCreator extends Task {
    constructor() {
        super();
    }
    new(description) {
        if (description.length === 0) {
            let descError = new Error();
            descError.name = "NoDescriptionFound";
            descError.message = "You need a description for your new task";
            throw descError;
        }
        let savedTasks = this.getList(undefined);
        const newTask = {
            id: this.getNextId(),
            description: description,
            status: "todo",
            createdAt: new Date().toLocaleString(),
            updatedAt: null,
        };
        savedTasks.push(newTask);
        fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));
        return newTask.id;
    }
}
export default new TaskCreator();
//# sourceMappingURL=index.js.map