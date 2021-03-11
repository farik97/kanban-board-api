const {createUserSql, getTypesSql, getPrioritiesSql, getStagesSql, createTokenSql, createTaskSql, assignTaskSql, updateTaskSql, getTokenSql, deleteTokenSql, getTasksSql, createPrioritySql} = require("./queries");
const db = require("mysql");
const con = db.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "jff08021997",
  database: "credit_dashboard",
});

exports.createUser = (userData) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.checkToken = (token) => {
  return new Promise((resolve, reject)=>{

  })
}

exports.createToken = (token) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.deleteToken = (token) => {

}

exports.checkUserAdmin = (id) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.createTask = (taskData) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.assignTask = (id, userID) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.getTasks = () => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.updateTask = (taskData) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.changeStage = (id, stage) => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.getStages = () => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.getPriorities = () => {
  return new Promise((resolve, reject)=>{
    
  })
}

exports.createPriority = (data) => {

}

exports.updatePriority = (id, data) => {

}

exports.getTypes = () => {
  return new Promise((resolve, reject)=>{
    
  })
}

