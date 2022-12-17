const express = require('express');
const UserRoute = require('./app/user');
const StatusRoute = require('./app/status')
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');



const app = express();


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/app/user', UserRoute);
app.use('/app/status',StatusRoute)


app.get('/goodbye', (req, res) => {

    res.send("Goodbye, Web Dev");
})
app.use(express.static(path.join(__dirname, 'build')));

 app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
//let mongoEndpoint = 'mongodb://127.0.0.1/twitter'; 
let mongoEndpoint = 'mongodb+srv://yuliu:Ly710129@cluster0.gfl6jmi.mongodb.net/twitter?retryWrites=true&w=majority'
if(process.env.MONGO) {
    mongoEndpoint = process.env.MONGO;
}
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
app.listen(8000, function() {
    console.log('Starting server');
});



// let mongoEndpoint = 'mongodb://127.0.0.1/pokemons';
// if(process.env.MONGO) {
//     mongoEndpoint = process.env.MONGO;
// }
// mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

//app.listen(process.env.PORT || 8000, () => {
//     console.log('Starting server...?')
// })