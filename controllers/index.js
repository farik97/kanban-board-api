const {createUser, authenticateUser, getUsers, createTask, updateTask, changeStage, getStages, getPriorities, getTypes, logout, getTask, getTasks} = require("../use-cases/index");

exports.createUser = async (req, res) => {
  const username =
    typeof req.body.username == "string" && req.body.username.trim().length > 0
      ? req.body.username
      : false;
  const password =
    typeof req.body.password == "string" && req.body.password.trim().length > 0
      ? req.body.password
      : false;
  const fullname =
    typeof req.body.fullname == "string" && req.body.fullname.trim().length > 0
      ? req.body.fullname
      : false;
  const age =
    typeof req.body.age == "number" && req.body.age > 0 ? req.body.age : false;
  let isAdmin =
    typeof req.body.isAdmin == "boolean" ? req.body.isAdmin : false;
  const token =
    typeof req.headers.authorization == "string" &&
    req.headers.authorization.trim().length == 12
      ? req.headers.authorization
      : false;
  if (token) {
    if (username && password && fullname && age && isAdmin !== undefined) {
      if (isAdmin == true) {
        isAdmin = '1'
      } else {
        isAdmin = '0'
      }
      return await createUser(username, password, fullname, age, isAdmin, token)
        .then((data)=>{
            return res.status(200).json({success: data})
        })
        .catch(err => {
          if (err == "token not found") return res.status(401).json({error: err})
          return res.status(400).json({error: err})
        })
    } else {
      console.log(username + password + fullname + age + isAdmin)
      return await res
        .status(400)
        .json({ validation: "One or more validations didnt pass" });
    }
  } else {
    return await res.status(401).json({ unauthorised: "token not sent" });
  }
};

exports.login = async (req, res) => {
    const username = typeof req.body.username == 'string' && req.body.username.trim().length > 0 ? req.body.username : false
    const password = typeof req.body.password == 'string' && req.body.password.trim().length > 0 ? req.body.password : false
    if (username && password) {
        return await authenticateUser(username, password)
            .then((tokenData)=>{
                return res.status(200).json(tokenData)
            })
            .catch(err => {
                return res.status(400).json({error: err})
            })
    } else {
        return await res.status(400).json({validation: 'one or more validations didn\'t pass'})
    }
};

exports.logout = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  if (token) {
    return await logout(token)
      .then(text => {
        return res.status(200).json({success: text})
      })
      .catch(err => {
        return res.status(400).json({error: err})
      })
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
};

exports.getTasks = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  if (token) {
    getTasks(token)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        if (err == "token not found") return res.status(401).json({error: err})
        return res.status(400).json({error: err})
      })
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
}

exports.getTask = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  const taskId = typeof req.body.taskId == 'number' && req.body.taskId > 0 ? req.body.taskId : false;
  if (token) {
    if (taskId) { 
      getTask(token,taskId)
        .then(data => {
          return res.status(200).json(data)
        })
        .catch(err => {
          if (err == "token not found") return res.status(401).json({error: err})
          return res.status(400).json({error: err})
        })
    } else {
      return await res.status(400).json({validation: 'one or more validations didnt pass the validation'})
    }
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
}

exports.getStages = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  if (token) {
    return await getStages(token)
      .then((data)=> {
        return res.status(200).json(data)
      })
      .catch(err => {
        if (err == "token not found") return res.status(401).json({error: err})
        return res.status(400).json({error: err})
      })
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
};

exports.getPriorities = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  if (token) {
    return await getPriorities(token)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        if (err == "token not found") return res.status(401).json({error: err})
        return res.status(400).json({error: err})
      })
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
};

exports.getTypes = async (req, res) => {
  let token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  if (token) {
    return await getTypes(token)
      .then(data => {
        return res.status(200).json(data)
      })  
      .catch(err => {
        if (err == "token not found") return res.status(401).json({error: err})
        return res.status(400).json({error: err})
      })
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
};

exports.getUsers = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization.trim() : false
  if (token) {
     return await getUsers(token)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        if (err == "token not found") return res.status(401).json({error: err})
        return res.status(400).json({error: err})
      })
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
};

exports.createTask = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization.trim() : false
  const taskName = typeof req.body.taskName == 'string' && req.body.taskName.trim().length > 0 ? req.body.taskName : false
  const typeId = typeof req.body.typeId == 'number' && req.body.typeId > 0 ? req.body.typeId : false
  const stageId = typeof req.body.stageId == 'number' && req.body.stageId > 0 ? req.body.stageId : false
  const priorityId = typeof req.body.priorityId == 'number' && req.body.priorityId > 0 ? req.body.priorityId : false
  const userId = typeof req.body.userId == 'number' && req.body.userId > 0 ? req.body.userId : false
  const description = typeof req.body.description == 'string' && req.body.description.trim().length > 0 ? req.body.description : false
  if (token) {
    if (taskName && typeId && stageId && priorityId && userId && description) {
      return await createTask(taskName, typeId, stageId, priorityId, userId, description, token)
        .then((text)=>{
          return res.status(200).json({success: text})
        })
        .catch(err => {
          if (err == "token not found") return res.status(401).json({error: err})
          return res.status(400).json({error: err})
        })
    } else {
      return await res.status(400).json({validation: 'one or more validations didnt pass the validation'})
    }
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
};

exports.updateTask = async (req, res) => {
  const token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  const taskId = typeof req.body.taskId == 'number' && req.body.taskId > 0 ? req.body.taskId : false 
  const taskName = typeof req.body.taskName == 'string' && req.body.taskName.trim().length > 0 ? req.body.taskName : false
  const typeId = typeof req.body.typeId == 'number' && req.body.typeId > 0 ? req.body.typeId : false
  const priorityId = typeof req.body.priorityId == 'number' && req.body.priorityId > 0 ? req.body.priorityId : false
  const description = typeof req.body.description == 'string' && req.body.description.trim().length > 0 ? req.body.description : false
  const userId = typeof req.body.userId == 'number' && req.body.userId > 0 ? req.body.userId : false
  if (token) {
    if (taskId || taskName || typeId || priorityId || description || userId) {
      return await updateTask(token, taskId, taskName, typeId, priorityId, description, userId)
        .then((text)=>{
          return res.status(200).json({success: text})
        })  
        .catch(err => {
          if (err == "token not found") return res.status(401).json({error: err})
          return res.status(400).json({error: err})
        })
    } else {
      return await res.status(400).json({validation: 'no data sent for update'});
    }
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'});
  }
};

exports.changeStage = async (req, res) => {
  let token = typeof req.headers.authorization == 'string' && req.headers.authorization.trim().length == 12 ? req.headers.authorization : false
  let taskId = typeof req.body.taskId == 'number' && req.body.taskId > 0 ? req.body.taskId : false
  let stageId = typeof req.body.stageId == 'number' && req.body.stageId > 0 ? req.body.stageId : false
  if (token) {
    if (taskId && stageId) {
      return await changeStage(token, stageId, taskId)
        .then((text)=>{
          return res.status(200).json({success: text})
        })
        .catch(err => {
          if (err == "token not found") return res.status(401).json({error: err})
          return res.status(400).json({error: err})
        })
    } else {
      return await res.status(400).json({validation: 'one or more validations didnt pass the validation'})
    }
  } else {
    return await res.status(401).json({unauthorised: 'token not sent'})
  }
}