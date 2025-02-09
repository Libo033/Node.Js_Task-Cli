import Task from "../taskInfrastructure/index.js";

export class CLI {
  private options: string[] = process.argv.slice(2);

  public async start() {
    try {
      const task = new Task();

      if (this.options[0] === undefined) {
        // Menu
        console.log(
          "Welcome To Task Tracker CLI by @valentinlibonati33@gmail.com"
        );
        console.log(
          "Task tracker is a project used to track and manage your tasks.\n"
        );
        console.log(`add [description]            Add a new Task`);
        console.log(`update [id] [description]    Update a Task`);
        console.log(`delete [id]                  Delete a Task`);
        console.log(`list                         List all the Tasks`);
        console.log(`list todo                    List only the Tasks To Do`);
        console.log(`list done                    List only the Tasks Done`);
        console.log(
          `list in-progress             List only the Tasks in Progress`
        );
        console.log(`mark-in-progress [id]        Mark Task In Progress`);
        console.log(`mark-done [id]               Mark Task Done\n`);

        return;
      }

      switch (this.options[0]) {
        case "add":
          let createdId = await task.create(this.options[1]);

          console.log(`Task created successfully with ID ${createdId}`);
          break;
        case "update":
          let updatedTask = task.update(
            parseInt(this.options[1]),
            this.options[2]
          );

          console.log(`Task ${updatedTask} updated successfully`);
          break;
        case "delete":
          let deletedId = task.delete(parseInt(this.options[1]));

          console.log(`Task ${deletedId} deleted successfully`);
          break;
        case "mark-in-progress":
          let inProgressId = task.markInProgress(parseInt(this.options[1]));

          console.log(`Task ${inProgressId} marked in-progress`);
          break;
        case "mark-done":
          let doneId = task.markDone(parseInt(this.options[1]));

          console.log(`Task ${doneId} marked done`);
          break;
        case "list":
          let list = task.getList(this.options[1]);

          console.log(list);
          break;

        default:
          let typeError = new Error();

          typeError.name = "CommandNotFound";
          typeError.message = "Try 'task-cli' to see all commands.";

          throw typeError;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}
