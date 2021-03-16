const {
  checkToken,
  createUser,
  getUserPasswordData,
  createToken,
  getUsers,
  createTask,
  updateTask,
  getTask,
  changeStage,
  getStages,
  getPriorities,
  getTypes,
  deleteToken,
  getTasks
} = require("../data-access/db");
const { hash, createRandomString } = require("../lib/helpers");

exports.authenticateAdmin = async (token) => {
  return await new Promise((resolve, reject) => {
    checkToken(token)
      .then((data) => {
        if (data.isAdmin == "1" && Date.now() < data.expiry_time) {
          return resolve(data);
        } else {
          if (data.isAdmin == "1") {
            return reject("token expired");
          } else {
            return reject("not admin");
          }
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.createUser = async (
  username,
  password,
  fullname,
  age,
  isAdmin,
  token
) => {
  return await new Promise((resolve, reject) => {
    this.authenticateAdmin(token)
      .then(() => {
        let salt = createRandomString(5);
        createUser(
          username,
          hash(password + salt),
          salt,
          fullname,
          age,
          isAdmin
        )
          .then(() => {
            return resolve("user created successfully");
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.createTask = async (
  taskName,
  typeId,
  stageId,
  priorityId,
  userId,
  description,
  token
) => {
  return new Promise((resolve, reject) => {
    this.authenticateAdmin(token)
      .then(()=>{
        createTask(taskName, typeId, stageId, priorityId, userId, description)
          .then((text)=>{
            return resolve(text)
          })
          .catch(err=>{
            return reject(err)
          })
      })
      .catch(err => {
        return reject(err)
      })
  });
};

exports.authenticateUser = async (username, password) => {
  return await new Promise((resolve, reject) => {
    getUserPasswordData(username) //    here we are expecting password and salt and userId
      .then((data) => {
        let hashedPassword = hash(password + data.salt);
        if (hashedPassword == data.password) {
          let tokenData = {
            token: createRandomString(12),
            expiry_time: Date.now() + 1000 * 60 * 60 * 3,
            id: data.id,
          };
          if (data.isAdmin == "1") {
            tokenData["isAdmin"] = true;
          }
          createToken(tokenData)
            .then(() => {
              delete tokenData["id"];
              return resolve(tokenData);
            })
            .catch((err) => {
              return reject(err);
            });
        } else {
          return reject("wrong password");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.getTasks = async (token) => {
  return await new Promise((resolve, reject)=>{
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          getTasks()
            .then(data => {
              return resolve(data)
            })
            .catch(err => {
              return reject(err)
            })      
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  })
}

exports.logout = async (token) => {
  return await new Promise((resolve, reject)=>{
    deleteToken(token)
      .then(text => {
        return resolve(text)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

exports.getStages = async (token) => {
  return await new Promise((resolve, reject) => {
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          getStages()
            .then((data)=>{
              return resolve(data)
            })
            .catch(err => {
              return reject(err)
            })
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  }); 
};

exports.getUsers = async (token) => {
  return await new Promise((resolve, reject) => {
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          getUsers()
            .then(data => {
              return resolve(data)
            })
            .catch(err => {
              return reject(err)
            })
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.getTask = async (token, taskId) => {
  return await new Promise((resolve, reject)=>{
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          getTask(taskId)
            .then(data => {
              return resolve(data)
            })
            .catch(err => {
              return reject(err)
            })
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  })
}

exports.getPriorities = async (token) => {
  return await new Promise((resolve, reject) => {
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          getPriorities()
            .then(data => {
              return resolve(data)
            })
            .catch(err => {
              return reject(err)
            })
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.changeStage = async (token, stageId, taskId) => {
  return await new Promise((resolve, reject) => {
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          changeStage(taskId, stageId)
            .then((text)=>{
              return resolve(text)
            })
            .catch(err => {
              return reject(err)
            })
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  }); 
}

exports.getTypes = async (token) => {
  return await new Promise((resolve, reject) => {
    checkToken(token)
      .then((data) => {
        if (Date.now() < data.expiry_time) {
          getTypes()
            .then(data => {
              return resolve(data)
            })
            .catch(err => {
              return reject(err)
            })
        } else {
          return reject("token expired");
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.updateTask = async (token, taskId, taskName, typeId, priorityId, description, userId) => {
  return await new Promise((resolve, reject)=>{
    this.authenticateAdmin(token)
      .then(()=>{
        getTask(taskId)
          .then((data)=>{
            if (taskName) {
              data.name = taskName
            }
            if (typeId) {
              data.typeID = typeId
            }
            if (priorityId) {
              data.priorityID = priorityId
            }
            if (description) {
              data.description = description
            }
            if (userId) {
              data.userId = userId
            }
            updateTask(taskId,data.name, data.typeID, data.priorityID, data.description, data.userId)
              .then((text)=>{
                return resolve(text)
              })
              .catch(err => {
                return reject(err)
              })
          })
          .catch(err => {
            return reject(err)  
          })
      })
      .catch(err => {
        return reject(err)
      })
  })
}