import fs from "fs";
import Task from "../index.js";
class TaskUpdater extends Task {
    constructor() {
        super();
    }
    update(id, description) {
        if (!id) {
            let idError = new Error();
            idError.name = "NoIDFound";
            idError.message = "You need a ID to update a task";
            throw idError;
        }
        else if (description.length === 0) {
            let descError = new Error();
            descError.name = "NoDescriptionFound";
            descError.message = "You need a description to update a task";
            throw descError;
        }
        let savedTasks = this.getList(undefined);
        let updateTaskId = 0;
        savedTasks.forEach((task) => {
            if (task.id === id) {
                task.description = description;
                task.updatedAt = new Date().toLocaleString();
                updateTaskId = task.id;
            }
        });
        fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));
        return updateTaskId;
    }
}
export default new TaskUpdater();
//# sourceMappingURL=index.js.map