const createError = require('http-errors');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {origins: '*:*'});

require('dotenv').config();
const {sequelize, models} = require('./src/models/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const cursorsRouter = require('./routes/cursor');
const projectsRouter = require('./routes/projects');
const messageRouter = require('./routes/messages')(io);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users/', usersRouter);
app.use('/projects/', projectsRouter);
app.use('/rooms/', roomsRouter);
app.use('/cursors/', cursorsRouter);

app.use('/messages/', messageRouter);
app.use(async (req, res, next) =>{
    req.context = {
        models,
        me: models.User.findByLogin()
    };
    next();
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err)
    //res.render('error');
});

io.sockets.on('connection', socket => {
    socket.emit('message', 'connecté');
    console.log("New connection");

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
    if (eraseDatabaseOnSync) {
        createSeedData();
    }
    server.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`)
    });
});

module.exports = app;
