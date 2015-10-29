var restify = require('restify');
var items = require('./routes/items');
var barcodes = require('./routes/barcodes');
var mongo = require('mongojs');

var url = 'mongodb://localhost:27017/salamander';
var groups = ['items']
var barcodeCache = [];

var db = mongo(url, groups);

var server = restify.createServer({
  name: 'Salamander'
});

server.listen(9000, function() {
    console.log('%s listening at %s', server.name, server.url);
});

server
  .use(restify.CORS( {
    credentials: true
  } ))
  //.use(restify.fullResponse()) // what does this do again?
  .use(restify.queryParser()) //parses GET arguments.
  .use(restify.bodyParser({ mapParams: true })) //parses body into json.
  .use(function(req, res, next) {
    //Pass database API into request handlers.
    req.db = db;
    req.barcodeCache = barcodeCache;
    next();
  })
  .use(function(req, res, next) {
    //STUB: Validate API Key
    if (req.query.apikey == null) {
      console.log("No value for apikey supplied");
      return next(new restify.NotAuthorizedError("No value for apikey supplied"));
    } else return next();
  });

server.get('/', function (req, res, next) {
  //Provide list of available functions. First item in list will be the default homepage.
  console.log('GET /');
  res.send(groups);
})

// Handlers for inventory.
server.get('/items', items.listItems);
server.post('/items', items.addItem);
server.get('/items/:barcode', items.getItem);
server.get('/items/:barcode/capabilities', items.getItemCapabilities);
server.post('/items/:barcode', items.replaceItem);
server.put('/items/:barcode', items.updateItem);

// Handlers for barcode webapp. May be broken.
server.get('/barcodes', barcodes.listBarcodes);
server.post('/barcodes', barcodes.scanBarcode);