const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No records existed");
      }
    })
    .catch(err => res.status(500).json(err));  // Handle potential errors
});

app.get('/user/:email', (req, res) => {
    const { email } = req.params;
    EmployeeModel.findOne({ email })
      .then(user => {
        if (user) {
          res.json({ name: user.name });
        } else {
          res.status(404).json('User not found');
        }
      })
      .catch(err => res.status(500).json(err));
  });

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  EmployeeModel.create({ name, email, password })
    .then(register => res.json(register))
    .catch(err => res.status(500).json(err)); // Sending a 500 status code for server errors
});

app.listen(3001, () => {
  console.log('Server is running...');
});
