import fs from "fs";
import { DbJson } from "../database/index.js";
export default class Task {
    db = new DbJson();
    getList(status) {
        const db = new DbJson();
        let savedTasks = JSON.parse(fs.readFileSync(db.getDbPath(), "utf-8"));
        if (!status) {
            return savedTasks;
        }
        else {
            return savedTasks.filter((task) => task.status === status);
        }
    }
    getNextId() {
        let savedTasks = this.getList(undefined);
        let nextId = 1;
        savedTasks.forEach((task, i) => {
            nextId++;
            if (!savedTasks[i + 1]) {
                task.id === nextId ? nextId++ : null;
            }
        });
        return nextId;
    }
}
//# sourceMappingURL=index.js.map