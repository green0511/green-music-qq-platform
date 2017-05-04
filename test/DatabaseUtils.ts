import { connection, disconnect, connect } from 'mongoose';
const MONGO_URI = 'mongodb://localhost:27017/test'

export function tearDown(){
  resetDb();
  if(connection.readyState) disconnect();
}

export function setUp(){
  if(!connection.readyState) connect(MONGO_URI);
}

export function resetDb(){
  if(connection.db) connection.db.dropDatabase();
}