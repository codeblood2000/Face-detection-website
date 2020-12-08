const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});


const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
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
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('Error signing in');
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    });
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        }).then(user => res.json(user[0]))
            .catch(err => res.status(400).json('unable to join'));


})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
   db.select('*').from('users').where({id}).then(user=>{
    if(user.length){   
    res.json(user[0]);
    }else{
        res.status(400).json('not found');
    }
   }).catch(err => {res.status(400).json('error getting user')})
    // if (!found) {
    //     res.status(400).json('no such user');
    // }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
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

