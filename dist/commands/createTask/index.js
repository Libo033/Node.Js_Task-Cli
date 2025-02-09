import fs from "fs";
import { DbJson } from "../../database/index.js";
const createTask = async (description) => {
    if (description.length === 0) {
        let descError = new Error();
        descError.name = "NO_DESCRIPTION_ADDED";
        descError.message = "You need a description for your new task";
        throw descError;
    }
    // get last ID
    const db = new DbJson();
    const newTask = {
        id: 1,
        description: description,
        status: "todo",
        createdAt: new Date().toUTCString(),
        updatedAt: null,
    };
    // GET LIST COMMAND
    let savedTasks = JSON.parse(fs.readFileSync(db.getDbPath(), "utf-8"));
    savedTasks.push(newTask);
    fs.writeFileSync(db.getDbPath(), JSON.stringify(savedTasks, null, 2));
    console.log(`Task created successfully with ID ${newTask.id}`);
};
export default createTask;
//# sourceMappingURL=index.js.map