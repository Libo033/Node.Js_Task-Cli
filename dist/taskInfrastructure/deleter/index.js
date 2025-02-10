import fs from "fs";
import Task from "../index.js";
class TaskDeleter extends Task {
    constructor() {
        super();
    }
    delete(id) {
        if (!id) {
            let idError = new Error();
            idError.name = "NoIDFound";
            idError.message = "You need a ID to delete a task";
            throw idError;
        }
        let savedTasks = this.getList(undefined);
        let resultTasks = savedTasks.filter((task) => task.id !== id);
        fs.writeFileSync(this.db.getDbPath(), JSON.stringify(resultTasks, null, 2));
        return id;
    }
}
export default new TaskDeleter();
//# sourceMappingURL=index.js.map