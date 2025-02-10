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
  protected db = new DbJson();

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

  protected getNextId() {
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
