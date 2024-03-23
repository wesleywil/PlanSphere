import * as SQLite from "expo-sqlite";


export const DatabaseConnection = {
  getConnection:()=> SQLite.openDatabase("database.db")
}

var db:any = null;


export default class DatabaseInit{
  constructor(){
    db = DatabaseConnection.getConnection()
    db.exec([{
      sql:'PRAGMA foreign_keys = ON;', args:[]
    }], false, ()=>
    console.log('Foreign keys turned on'));
    this.InitDb()
  }
  private InitDb(){
    var sql = [
      `DROP TABLE IF EXISTS plans;`,

      `CREATE TABLE IF NOT EXISTS plans(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        priority VARCHAR(255),
        note TEXT,
        limit_date DATE,
      );`
    ];

    db.transaction(
      (tx:any)=>{
        for (var i = 0; i< sql.length; i++){
          console.log("Execute SQL: ", sql[i]);
          tx.executeSql(sql[i]);
        }
      },(error:any)=>{
        console.log("error call back : " + JSON.stringify(error));
          console.log(error);
      }, ()=>{
        console.log("transaction complete call back")
      }
    )
  }
}