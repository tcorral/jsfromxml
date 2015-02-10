var xml = require('../lib/xml');
var json = require('../lib/json');

module.exports = {
    toJsObject: xml.xml2js,
    toJSON: function (_xml, callback) {
        xml.xml2js(_xml, function (err, js) {
            callback(null, JSON.stringify(js));
        });
    },
    toJsObjectFromFile: xml.readXMLFileAndReturnsJS,
    toJSONFromFile: function (filepath, callback) {
        xml.readXMLFileAndReturnsJS(filepath, function (err, js) {
           callback(null, JSON.stringify(js));
        });
    },
    toXML: json.js2xml,
    toXMLFromJSON: function (_json, callback){
        var jsObject;
        try{
            jsObject = JSON.parse(_json);
        }catch(err){
            return callback(err);
        }
        json.js2xml(jsObject, callback);
    },
    toXMLFromFile: json.readJSONFileAndReturnXML
};
