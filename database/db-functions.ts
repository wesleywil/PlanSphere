import { Plan } from "../utils/models";
import { DatabaseConnection } from "./db-service";

const db = DatabaseConnection.getConnection();

export const createPlan = async (plan: Plan): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(
          `INSERT INTO plans(title, priority, note, limit_date) VALUES (?, ?, ?, ? )`,
          [
            plan.title,
            plan.priority ?? null,
            plan.note ?? null,
            plan.limit_date ?? null,
          ],
          (_: any, resultSet: any) => {
            resolve();
          },
          (_: any, error: any) => {
            reject(error);
            return true;
          }
        );
      },
      (error: any) => {
        reject(error);
      }
    );
  });
};

export const getPlans = (): Promise<unknown> => {
  return new Promise((resolve, reject) =>
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM plans ORDER BY id DESC`,
          [],
          (_, { rows }) => {
            resolve(rows);
          }
        ),
          (sqlError: any) => {
            console.log(sqlError);
          };
      },
      (txError) => {
        console.log(txError);
      }
    )
  );
};

export const getPlanById = (id: number): Promise<Plan> => {
  return new Promise((resolve, reject) =>
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM WHERE id = ? ",
          [id],
          (_: any, { ...plan }: any) => {
            resolve(plan);
          }
        ),
          (sqlError: any) => {
            console.log(sqlError);
          };
      },
      (txError: any) => {
        console.log(txError);
      }
    )
  );
};

export const updatePlanById = (plan: Plan): Promise<any> => {
  return new Promise((resolve, reject) =>
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE plan SET title=?, priority=?, note=?, limit_date=? WHERE id=?",
          [
            plan.title,
            plan.priority ?? null,
            plan.note ?? null,
            String(plan.limit_date),
            plan.id ?? null,
          ],
          (_: any, { rows }: any) => {
            resolve(rows);
          }
        ),
          (sqlError: any) => {
            console.log(sqlError);
          };
      },
      (textError: any) => {
        console.log(textError);
      }
    )
  );
};

export const deletePlanById = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM plans WHERE id=?",
          [id],
          (_: any, { rows }: any) => {
            resolve(rows);
          }
        ),
          (sqlError: any) => {
            console.log(sqlError);
          };
      },
      (txtError: any) => {
        console.log(txtError);
      }
    );
  });
};
