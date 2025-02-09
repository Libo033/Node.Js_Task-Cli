import fs from "fs";
import { DbJson } from "../database/index.js";
export default class Task {
    db = new DbJson();
    async create(description) {
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
    markInProgress(id) {
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
    markDone(id) {
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