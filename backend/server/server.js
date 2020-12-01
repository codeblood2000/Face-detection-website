const express = require('express');

const app = express();

app.use(express.json());

const database = {
    users:[
    {
        id: '123',
        name: 'Yash',
        email: 'yash@gmail.com',
        password: 'anime',
        entries: 10,
        joined: new Date(), 
    },
    {
        id: '124',
        name: 'Khushi',
        email: 'Khushi@gmail.com',
        password: 'blackpink',
        entries: 5,
        joined: new Date(),
    }
]
}
app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('sucess');
    }else{
        res.status(400).json('Error signing in');   
    }
})

app.post('/register',(req,res)=>{
    const{email, password, name} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
    });
    res.json(database.users[database.users.length -1]);
})

app.listen(3000, () => {
    console.log('the server is running');
})

