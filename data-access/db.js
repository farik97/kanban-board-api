const {
  createUserSql,
  getTypesSql,
  getUsersSql,
  getPrioritiesSql,
  getStagesSql,
  createTokenSql,
  createTaskSql,
  assignTaskSql,
  updateTaskSql,
  getTokenSql,
  deleteTokenSql,
  getTasksSql,
  createPrioritySql,
  getUserData,
  getTaskSql,
  getUserDataForToken,
} = require("./queries");
const db = require("mysql");
const con = db.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "jff08021997",
  database: "frontEndTest",
});

exports.createUser = (username, password, salt, fullname, age, isAdmin) => {
  return new Promise((resolve, reject) => {
    let sqlCreateUser = createUserSql;
    sqlCreateUser += ` ('${fullname}', '${age}', '${username}', '${password}', '${salt}', '${isAdmin}')`;
    con.query(sqlCreateUser, (err, result) => {
      if (!err) {
        return resolve("user created successfully");
      } else {
        return reject(err);
      }
    });
  });
};

exports.checkToken = (token) => {
  return new Promise((resolve, reject) => {
    let sqlGetTokenUserData = getUserDataForToken;
    sqlGetTokenUserData += ` '${token}'`;
    con.query(sqlGetTokenUserData, (err, result) => {
      if (!err) {
        if (result.length > 0) {
          return resolve(result[0]);
        } else {
          return reject('token not found')
        }
      } else {
        return reject(err.sqlMessage);
      }
    });
  });
};

exports.createToken = (tokenData) => {
  return new Promise((resolve, reject) => {
    let sqlCreateToken = createTokenSql;
    sqlCreateToken += ` ('${tokenData.id}', '${tokenData.token}', '${tokenData.expiry_time}')`;
    con.query(sqlCreateToken, (err, result) => {
      if (!err) {
        return resolve(tokenData);
      } else {
        return reject(err.sqlMessage);
      }
    });
  });
};

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    con.query(getUsersSql, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err.sqlMessage);
      }
    });
  });
};

exports.deleteToken = (token) => {
  return new Promise((resolve, reject)=> {
    let sqlDeleteToken = deleteTokenSql;
    sqlDeleteToken += ` '${token}'`
    con.query(sqlDeleteToken, (err, result)=>{
      if (!err) {
        return resolve('token deleted successfully')
      } else {
        return reject(err.sqlMessage)
      }
    })
  })
};

exports.createTask = (
  taskName,
  typeId,
  stageId,
  priorityId,
  userId,
  description
) => {
  return new Promise((resolve, reject) => {
    let sqlCreateTask = createTaskSql;
    sqlCreateTask += ` ('${taskName}', '${typeId}', '${stageId}', '${priorityId}', '${description}', '${userId}')`
    con.query(sqlCreateTask, (err, result)=>{
      if (!err) {
        return resolve('task successfully created')
      } else {
        return reject(err.sqlMessage)
      }
    })
  });
};

exports.getTasks = () => {
  return new Promise((resolve, reject) => {
    con.query(getTasksSql, (err, result)=>{
      if (!err) {
        return resolve(result)
      } else {
        return reject(err)
      }
    })
  });
};

exports.updateTask = (taskId, taskName, typeId, priorityId, description, userId) => {
  return new Promise((resolve, reject) => {
    let sqlUpdateTask = updateTaskSql
    sqlUpdateTask += ` name = '${taskName}', typeID = '${typeId}', priorityID = '${priorityId}', description = '${description}', userId = '${userId}' WHERE id = '${taskId}'`
    con.query(sqlUpdateTask, (err, result)=>{
      if (!err) {
        return resolve('task updated')
      } else {
        return reject(err.sqlMessage)
      }
    })
  });
};

exports.changeStage = (id, stageId) => {
  return new Promise((resolve, reject) => {
    let sqlUpdateStage = updateTaskSql;
    sqlUpdateStage += ` stageID = '${stageId}' WHERE id = '${id}'`
    con.query(sqlUpdateStage, (err, result)=>{
      if (!err) {
        return resolve('task stage updated successfully')
      } else {
        return reject('couldnt update stage')
      }
    })
  });
};

exports.getStages = () => {
  return new Promise((resolve, reject) => {
    con.query(getStagesSql, (err, result)=>{
      if (!err) {
        if (result.length > 0) {
          return resolve(result)
        } else {
          return reject('stages dont exist')
        }
      } else {
        return reject(err.sqlMessage)
      }
    })
  });
};

exports.getPriorities = () => {
  return new Promise((resolve, reject) => {
    con.query(getPrioritiesSql, (err, result)=>{
      if (!err) {
        return resolve(result)
      } else {
        return reject(err.sqlMessage)
      }
    })
  });
};

exports.getTask = (taskId) => {
  return new Promise((resolve, reject)=>{
    let sqlGetTask = getTasksSql;
    sqlGetTask += ` AND tasks.id = '${taskId}'`
    con.query(sqlGetTask, (err, result)=>{
      if (!err) {
        if (result.length > 0) {
          return resolve(result[0])
        } else {
          return reject('not found')
        }
      } else {
        return reject(err.sqlMessage)
      }
    })
  })
}

exports.getTypes = () => {
  return new Promise((resolve, reject) => {
    con.query(getTypesSql, (err, result)=> {
      if (!err) {
        return resolve(result)
      } else {
        return reject(err.sqlMessage)
      }
    })
  });
};

exports.getUserPasswordData = (username) => {
  return new Promise((resolve, reject) => {
    let sqlGetUserData = getUserData;
    sqlGetUserData += ` '${username}'`;
    con.query(sqlGetUserData, (err, result) => {
      if (!err) {
        return resolve(result[0]);
      } else {
        return reject(err.sqlMessage);
      }
    });
  });
};