import fs from "fs";
import Task, { TaskProps } from "../index.js";

interface TaskMarkerOptions {
  inProgress: (id: number) => number;
  done: (id: number) => number;
}

class TaskMarker extends Task implements TaskMarkerOptions {
  constructor() {
    super();
  }

  public inProgress(id: number): number {
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

  public done(id: number): number {
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
}

export default new TaskMarker();
