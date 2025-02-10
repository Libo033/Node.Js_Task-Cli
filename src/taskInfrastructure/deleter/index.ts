import fs from "fs";
import Task, { TaskProps } from "../index.js";

interface TaskDeleterOptions {
  delete: (id: number) => number;
}

class TaskDeleter extends Task implements TaskDeleterOptions {
  constructor() {
    super();
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
}

export default new TaskDeleter();
