const app = require('express')();
const cors = require('cors');
const { createUser, getUsers, updateUser, login, logout, createTask, updateTask, deleteTask, getPriorities, getStages, updatePriority, createPriority } = require('./controllers');
const { validateEmpty } = require('./helpers');

app.use(cors());
app.listen(3000);

//  user routes
app.post('/api/user', validateEmpty, createUser)
app.get('/api/users', getUsers)
app.put('/api/user', validateEmpty, updateUser)

//  authentication
app.post('/api/token', validateEmpty, login)
app.delete('/api/token', logout )

//  task routes
app.post('/api/task', validateEmpty, createTask)
app.put('/api/task', validateEmpty, updateTask)
app.delete('/api/task/:id', deleteTask)

//  priority routes
app.post('/api/priority', validateEmpty, createPriority)
app.put('/api/priority', validateEmpty, updatePriority)
app.get('/api/priority', getPriorities)

//  stages 
app.get('/api/stage', getStages)