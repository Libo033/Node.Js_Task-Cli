import fs from "fs";
import { DbJson } from "../database/index.js";

export interface TaskProps {
  id: number;
  description: string;
  status: "todo" | "done" | "in-progress";
  createdAt: string;
  updatedAt: null | string;
}

export default class Task {
  private db = new DbJson();

  public async create(description: string): Promise<number> {
    if (description.length === 0) {
      let descError = new Error();

      descError.name = "NoDescriptionFound";
      descError.message = "You need a description for your new task";

      throw descError;
    }

    let savedTasks: TaskProps[] = this.getList(undefined);

    const newTask: TaskProps = {
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

  public update(id: number, description: string): number {
    if (!id) {
      let idError = new Error();

      idError.name = "NoIDFound";
      idError.message = "You need a ID to update a task";

      throw idError;
    } else if (description.length === 0) {
      let descError = new Error();

      descError.name = "NoDescriptionFound";
      descError.message = "You need a description to update a task";

      throw descError;
    }

    let savedTasks: TaskProps[] = this.getList(undefined);
    let updateTaskId: number = 0;

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

  public delete(id: number): number {
    if (!id) {
      let idError = new Error();

      idError.name = "NoIDFound";
      idError.message = "You need a ID to delete a task";

      throw idError;
    }

    let savedTasks: TaskProps[] = this.getList(undefined);

    let resultTasks: TaskProps[] = savedTasks.filter((task) => task.id !== id);

    fs.writeFileSync(this.db.getDbPath(), JSON.stringify(resultTasks, null, 2));

    return id;
  }

  public markInProgress(id: number): number {
    if (!id) {
      let idError = new Error();

      idError.name = "NoIDFound";
      idError.message = "You need a ID to mark in-progress a task";

      throw idError;
    }

    let savedTasks: TaskProps[] = this.getList(undefined);

    savedTasks.forEach((task) => {
      if (task.id === id) task.status = "in-progress";
    });

    fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));

    return id;
  }

  public markDone(id: number): number {
    if (!id) {
      let idError = new Error();

      idError.name = "NoIDFound";
      idError.message = "You need a ID to mark done a task";

      throw idError;
    }

    let savedTasks: TaskProps[] = this.getList(undefined);

    savedTasks.forEach((task) => {
      if (task.id === id) task.status = "done";
    });

    fs.writeFileSync(this.db.getDbPath(), JSON.stringify(savedTasks, null, 2));

    return id;
  }

  public getList(status: string | undefined): TaskProps[] {
    const db = new DbJson();

    let savedTasks: TaskProps[] = JSON.parse(
      fs.readFileSync(db.getDbPath(), "utf-8")
    );

    if (!status) {
      return savedTasks;
    } else {
      return savedTasks.filter((task) => task.status === status);
    }
  }

  private getNextId() {
    let savedTasks: TaskProps[] = this.getList(undefined);
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
