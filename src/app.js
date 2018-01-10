const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const os = require('os');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const middleware = require('./middleware');
const services = require('./services');
const graphql = require('./graphql');
const appHooks = require('./app.hooks');
const schema = require('./graphql/schema');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/feathers-dev-api');

const app = feathers();

app.configure(configuration());
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

app.use('/', feathers.static(app.get('public')));

app.configure(hooks());
app.configure(rest());
app.configure(socketio(function(io){

    new SubscriptionServer({
        execute,
        subscribe,
        schema
      }, {
        server: io,
        path: '/subscriptions',
      });
}));

app.configure(middleware);
app.configure(services);
app.configure(graphql);
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
