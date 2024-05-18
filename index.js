require('dotenv').config();

const fs = require('fs');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

const studentRoutes = require('./routes/student.route');
app.use('/api/students', studentRoutes);

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/jpmcstds')
    .then(
        console.log("Mongo connected successfully")
    );

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/index.html', "utf-8", (err, htmlData) => {
        if (err) {
            console.log(err);
        }
        else {
            fs.readFile(__dirname + '/index.css', "utf-8", (err, cssData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    fs.readFile(__dirname + '/index1.js', "utf-8", (err, jsData) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.write(`
                                    <style>${cssData}</style>
                                    ${htmlData}
                                    <script>${jsData}</script>
                                `)
                            res.end()
                        }
                    })
                }
            })
        }
    });
});

// app.get('/api/students', (req, res) => {
//     res.status(200).send("Welcome to Student Page");
// });

app.listen(port, () =>
    console.log(`Server is running successfully at ${port}`)
);