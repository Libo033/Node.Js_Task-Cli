import fs from "fs";
import * as path from "path";

export class DbJson {
  private dbPath: string = "";

  init() {
    this.setDbPath();

    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, JSON.stringify([]));
    }
  }

  getDbPath() {
    let __dirname = process.cwd();
    return path.resolve(__dirname, "./taskDb.json");
  }

  setDbPath() {
    this.dbPath = this.getDbPath();
  }
}
