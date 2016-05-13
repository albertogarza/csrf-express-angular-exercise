
var   express = require('express')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , cookieParser = require('cookie-parser')
    , cookieSession = require('cookie-session')
    , errorhandler = require('errorhandler')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments lOTRgODT-n8j1Vh-jZmrubXr2yXGcg4X4NG0
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', routes.index);

app.post('/', function(req, res) {
  console.log('sending back: ' + req.body.value);
  res.send(req.body.value)
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
