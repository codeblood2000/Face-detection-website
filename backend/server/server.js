const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

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
//     bcrypt.compare("manga", "$2a$10$HLnGD8JRWC8BA8fk6xz/HOzJLmr6f/4OjVBK.nD5LJ0sYelOREcJm", function(err, res) {
//     console.log('first guess',res);
// });
// bcrypt.compare("mang", "$2a$10$HLnGD8JRWC8BA8fk6xz/HOzJLmr6f/4OjVBK.nD5LJ0sYelOREcJm", function(err, res) {
//     console.log('second guess',res);

// });
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('sucess');
    }else{
        res.status(400).json('Error signing in');   
    }
})

app.post('/register',(req,res)=>{
    const{email, password, name} = req.body;
        bcrypt.hash(password, null, null, function(err, hash) {
            console.log(hash);
        });
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

app.get('/profile/:id',(req,res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
           return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('no such user');
    }
})

app.post('/image',(req,res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
           return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('no such user');
    }
})


// // Load hash from your password DB.

// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('the server is running');
})

