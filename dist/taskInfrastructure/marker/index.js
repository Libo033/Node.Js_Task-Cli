import fs from "fs";
import Task from "../index.js";
class TaskMarker extends Task {
    constructor() {
        super();
    }
    inProgress(id) {
        if (!id) {
            let idError = new Error();
            idError.name = "NoIDFound";
            idError.message = "You need a ID to mark in-progress a task";
            throw idError;
        }
        let savedTasks = this.getList(undefined);
        savedTasks.forEach((task) => {
            if (task.id === id)
                task.status = "in-progress";
        });
        fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));
        return id;
    }
    done(id) {
        if (!id) {
            let idError = new Error();
            idError.name = "NoIDFound";
            idError.message = "You need a ID to mark done a task";
            throw idError;
        }
        let savedTasks = this.getList(undefined);
        savedTasks.forEach((task) => {
            if (task.id === id)
                task.status = "done";
        });
        fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));
        return id;
    }
}
export default new TaskMarker();
//# sourceMappingURL=index.js.map