const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var User = require('./mongodb/userschema');
const PORT = 3000;
const app = express();

//connect to mongodb
let url = ('mongodb://'+config.mongodbConfig.username+':'+config.mongodbConfig.password+'@'+ config.mongodbConfig.host +':'+ config.mongodbConfig.port +'/'+config.mongodbConfig.dbname);

// const mlaboptions = {
//     autoIndex: false, // Don't build indexes
//     autoReconnect:true,
//     reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//     reconnectInterval: 500, // Reconnect every 500ms
//     poolSize: 10, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries: 0,
//     promiseLibrary:require('bluebird')
// };

mongoose.Promise=global.Promise;

// mongoose.connect(url,mlaboptions);
mongoose.connect('mongodb://127.0.0.1:27017/gpa');

let db = mongoose.connection;
db.on('connected',()=>{
    console.log('Connected to the database')
});
//mongo errors
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    //connected
});


//controllers
let githubController = require('./controllers/github');
let mongodbController = require('./controllers/mongodb');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var coreOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
};

app.use(cors(coreOptions));

//use session for tracking signIns
app.use(session({
    secret:'git profile visualizer',
    resave:true,
    saveUninitialized:false,
    store:new MongoStore({
        mongooseConnection:db
    })
}));

//github rest endpoint
app.get('/getgithubuser/:username',githubController.getUser);
app.get('/getrepositories/:username',githubController.getUserRepos);
app.get('/getReposDetails/:username',githubController.getReposDetails);
app.get('/getPopularLanguages/:username',githubController.getPopularLanguages);
app.post('/getRepo',githubController.getRepo);
app.post('/getRepoLanguages',githubController.getRepoLanguages);
app.post('/getRepoStats',githubController.getRepoStats);
app.post('/getCodeQuality',githubController.getCodeQuality);

//mongodb
app.post('/signUp',mongodbController.signUp);
app.post('/signIn',mongodbController.signIn);
app.get('/profile', mongodbController.getProfile);
app.get('/signOut', mongodbController.signOut);
app.get('/signInWithGithub',mongodbController.signInWithGithub);

//error handler
//404 error
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

//server
app.listen(PORT,() => {
    console.log('server running on port : ',PORT);
});