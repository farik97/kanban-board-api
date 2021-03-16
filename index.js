const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  createUser,
  getUsers,
  login,
  logout,
  createTask,
  updateTask,
  getPriorities,
  getStages,
  changeStage,
  getTasks,
  getTypes,
  getTask
} = require("./controllers/");
const { validateEmpty} = require("./lib/helpers");

app.use(cors());
app.use(bodyParser.json());
app.listen(4000);

//  user routes
app.post("/api/user", validateEmpty, createUser); // done
app.get("/api/users", getUsers); // done

//  authentication
app.post("/api/token", validateEmpty, login); // done
app.delete("/api/token", logout); // done

//  task routes
app.post("/api/task", validateEmpty, createTask); //  done
app.put("/api/task", validateEmpty, updateTask); // done
app.get("/api/task", validateEmpty, getTask) //
app.put("/api/changeStage", validateEmpty, changeStage) // done
app.get("/api/tasks", getTasks) // done

// types routes
app.get("/api/types", getTypes) // done

//  priority routes
app.get("/api/priority", getPriorities); // done

//  stages
app.get("/api/stage", getStages); // done