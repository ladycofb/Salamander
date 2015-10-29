exports.listItems = function(req, res, next){
  // List _id's (barcodes) of all documents in items collection
  console.log("called listItems")
  var collection = req.db.items;
  collection.find({},{},function(e,itemsFromMongo){
    var itemsToReturn = [];
    for(var i = 0, size = itemsFromMongo.length; i < size ; i++){
      var item = itemsFromMongo[i];
      itemsToReturn.push(item['_id']);
    }
    
    res.send( itemsToReturn );
  });
  return next();
};

exports.addItem = function(req, res, next){
  // Add new item. Requires that the barcode be set.
  reqdata = JSON.parse(req.body)
  if (validateBarcode(reqdata['_id'])) {
    console.log("called addItem");
    var collection = req.db.items;
    collection.save(reqdata)
    res.send({});
  } else {
    return next(res.send(400, "Invalid _id or no _id specified"));
  }
};

validateBarcode = function(barcode){
  return true
}

exports.getItem = function(req, res, next){
  // Return document with _id :barcode E.G fetch a product for display.
  requestedBarcode = req.params.barcode.toString()
  console.log("called getItem on " + requestedBarcode)
  var collection = req.db.items;
  collection.id = function (str) { return str; };
  collection.findOne({'_id': requestedBarcode},function(e,itemsFromMongo){
    if (itemsFromMongo !== null) {
      res.send( itemsFromMongo );
    } else {
      return next(res.send(404, "No item with barcode "+requestedBarcode));
    }
  });
  return next();
};

exports.getItemCapabilities = function(req, res, next){
  /* Return document with _id :barcode */
  requestedBarcode = req.params.barcode.toString()
  console.log("called getItem on " + requestedBarcode)
  return next();
};

exports.updateItem = function(req, res, next){
  /* Use collection.update to change single/multiple values in document with _id :barcode */
  requestedBarcode = req.params.barcode.toString()
  console.log("called updateItem on " + requestedBarcode)
  var collection = req.db.items;
  collection.findOne({'_id': requestedBarcode},function(e,itemsFromMongo){
    if (itemsFromMongo !== null) {
      res.send( {"didNothing": true, "amount":itemsFromMongo['amount']} );
    } else {
      return next(res.send(404, "No item with barcode "+requestedBarcode));
    }
  });
  return next();
};

exports.replaceItem = function(req, res, next){
  /* Use collection.save to replace entire document with _id :barcode */
  requestedBarcode = req.params.barcode.toString()
  console.log("called replaceItem on " + requestedBarcode)
  var collection = req.db.items;
  collection.id = function (str) { return str; };
  collection.findOne({'_id': requestedBarcode},function(e,itemsFromMongo){
    if (itemsFromMongo !== null) {
      res.send( {"didNothing": true, "amount":itemsFromMongo['amount']} );
    } else {
      return next(res.send(404, "No item with barcode "+requestedBarcode));
    }
  });
  return next();
};
