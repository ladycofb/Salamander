exports.scanBarcode = function(req, res, next) {
  /* Add new scanned barcode to barcode cache */
  res.contentType = 'text/html';
  scannedBarcode=req.params['barcode'].toString();
  console.log("called scanBarcode on item "+scannedBarcode);
  req.barcodeCache.push(scannedBarcode);  
  htmlResponse = '<html><head><script type="text/javascript">window.location="http://192.168.0.68/pda.html";</script></head><body></body></html>';
  res.send(htmlResponse);
  return next();
};

exports.listBarcodes = function(req, res, next) {
  /* List all scanned barcodes waiting in the server cache */
  console.log("called listBarcodes");
  res.send(JSON.stringify(req.barcodeCache));
  return next();
};
