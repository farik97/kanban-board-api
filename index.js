const app = require('express')();
const cors = require('cors');
const { validateEmpty } = require('./helpers');

app.use(cors());
app.listen(3000);

app.get('/', (req, res)=>{
    res.send('hi')
});

//  user routes
app.post('/api/user', validateEmpty, )
app.get('/api/user',)
app.put('/api/user', validateEmpty)

//  authentication
app.post('/api/token', validateEmpty,)
app.delete('/api/token', )

//  task routes
app.post('/api/task', validateEmpty)
app.put('/api/task', validateEmpty)
app.delete('/api/task/:id')

//  priority routes
app.post('/api/priority', validateEmpty)
app.put('/api/priority', validateEmpty)