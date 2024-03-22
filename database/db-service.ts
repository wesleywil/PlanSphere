import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";
import { Plans } from "../utils/models";

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: "plans.db", location: "default" });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS plans(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        priority VARCHAR(255),
        note TEXT,
        limit_date DATE,
    )`;

  await db.executeSql(query);
};

export const getPlans = async (db: SQLiteDatabase): Promise<Plans[]> => {
  try {
    const plans: Plans[] = [];
    const results = await db.executeSql(`SELECT rowid as id, value FROM plans`);
    results.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        plans.push(result.rows.item(index));
      }
    });
    return plans;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get plans !!!");
  }
};

export const savePlan = async (db: SQLiteDatabase, plan: Plans) => {
  const insertQuery =
    `INSERT INTO plans (id, title, priority, note, limit_date) VALUES (${plan.id}, '${plan.title}', '${plan.priority}', '${plan.note}', '${plan.limit_date}')`;

  return db.executeSql(insertQuery);
};

export const deletePlan = async(db:SQLiteDatabase, id:number)=>{
    const deleteQuery = `DELETE from plans where id = ${id}`;
    await db.executeSql(deleteQuery);
}


