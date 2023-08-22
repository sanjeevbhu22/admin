import pool from "./db";
import { v4 as uuidv4 } from 'uuid';


interface User {
  name:string;
  email: string;
  password:string;
  // ...other properties
}



export async function getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      pool.query(query, (err:any, users:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
}

export async function insertUpdate(userId:Number,content:string){
  return new Promise((resolve,reject)=>{
    const query ='INSERT INTO updates (user_id, content, timestamp) VALUES (?, ?, NOW())';
    const values = [userId, content];
    pool.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results); // Resolve with the inserted ID
    });
  })
}

export async function insertUser(userData:User){
  return new Promise((resolve,reject)=>{
    const user_id = uuidv4()
    const query = 'INSERT INTO users (user_id,name,email,password) VALUES(?,?,?,?)';
    const values = [user_id,userData.name,userData.email,userData.password]
    pool.query(query,values,(err,results)=>{
      if(err){
        return reject(err);
      }
      resolve(results);
    })
  })
}

export async function searchUserByMail(email:string):Promise<User>{
  return new Promise ((resolve,reject)=>{
    const query = 'SELECT * from users where email  = ? '
    pool.query(query,email,(err,user:any)=>{
      if(err){
        console.log(err)
        return reject(err);
      }
      resolve(user[0])
    })
  })
}