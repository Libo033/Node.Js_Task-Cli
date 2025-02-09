import fs from "fs";
import { DbJson } from "../../database/index.js";
const listTask = async (status) => {
    const db = new DbJson();
    let savedTasks = JSON.parse(fs.readFileSync(db.getDbPath(), "utf-8"));
    if (!status) {
        console.log(savedTasks);
    }
    else {
        console.log(savedTasks.filter((task) => task.status === status));
    }
};
export default listTask;
//# sourceMappingURL=index.js.map