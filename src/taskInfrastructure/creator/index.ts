import fs from "fs";
import Task, { TaskProps } from "../index.js";

interface TaskCreatorOptions {
  new: (description: string) => number;
}

class TaskCreator extends Task implements TaskCreatorOptions {
  constructor() {
    super();
  }

  public new(description: string): number {
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
}

export default new TaskCreator();
