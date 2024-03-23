import { Plans } from "../utils/models";
import { DatabaseConnection } from "./db-service";

const db = DatabaseConnection.getConnection();

export const createPlan = async (plan: Plans) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(
          `INSERT INTO plans(title, priority, note, limit_date) VALUES (?, ?, ?, ? )`,
          [plan.title, plan.priority!, plan.note!, plan.limit_date!]
        );
      },
      resolve,
      reject
    );
  });
};


export const getPlans = (): Promise<unknown> => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(`select * from plans`, [], (_, { rows }) => {
          resolve(rows)
      }), (sqlError:any) => {
          console.log(sqlError);
      }}, (txError) => {
      console.log(txError);
  }))
  };