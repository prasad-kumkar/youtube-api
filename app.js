var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

var videoRouter = require('./routes/video');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/videos', videoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoose = require('mongoose');

var url = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@cluster0.u8gqx.mongodb.net/videos?authSource=admin&replicaSet=atlas-g3dftk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
mongoose.connect(url);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB --  database connection established successfully!');
  updateVideos();
});
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

const axios = require('axios')
const Video = require('./models/video.js');

function updateVideos(){
  axios.get('https://youtube.googleapis.com/youtube/v3/search', { 
    params: {
      key: process.env.API_KEY,
      part: 'snippet',
      maxResults: 25,
      type: 'video',
      order: 'date',
      q: 'crypto',
      publishedAfter: '2021-01-12T14:47:50.000Z'
    }})
  .then(async response => {
    for(let i in response.data.items){
      let video = response.data.items[i].snippet;
      let videoId = response.data.items[i].id.videoId
      let videoExists = await Video.findOne({ id: videoId });
      if(!videoExists && videoId && video.description){
        video = new Video(
          {
            id: videoId,
            title: video.title, 
            description: video.description,
            publishTime: video.publishTime,
            thumbnailUrls: video.thumbnails
          }
        )
        video.save()
        .then(response => {
          console.log('Video added: ', response.id);
        })
        .catch(err => {
          console.log(err);
        })
      }
      else if(!videoId){
        console.log(response.data.items[i]);
      }
      else if(! video.description){
        console.log(video);}
      
    }
    setTimeout(updateVideos, 10000)
  })
  .catch(err => {
    console.log(err.response.data.error.message);
    setTimeout(updateVideos, 1000000)
  })
}

module.exports = app;
