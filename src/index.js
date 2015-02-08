var fs = require('fs');
var xmldoc = require('xmldoc');
function addNode(node, obj){
    var arr = [];
    var _obj = {
        '@': node.attr,
        '$': node.val,
        '>': {}
    };

    //console.log(node.name);

    if(obj[node.name] && !Array.isArray(obj[node.name])){
        arr.push(obj[node.name]);
        obj[node.name] = arr;
        obj[node.name].push(_obj);
    }else{
        obj[node.name] = _obj;
    }

    node.children.forEach(function (child){
        addNode(child, _obj['>']);
    });

    if(node.children.length === 0){
        delete _obj['>'];
    }
    if(Object.keys(node.attr).length === 0){
        delete _obj['@'];
    }
    if(node.val.length === 0){
        delete _obj['$'];
    }
}
function converter(xml, callback){
    var jsObj = {};
    var document = new xmldoc.XmlDocument(xml);

    try{
        addNode(document, jsObj);
        callback(null, jsObj);
    }catch(er){
        return callback(err);
    }
}
module.exports = {
    toJSON: converter,
    toJSONFromFile: function (filePath, callback){
        fs.readFile(filePath, 'UTF-8', function (err, xml) {
            if (err) {
                return console.log('Something went wrong!', err);
            }
            converter(xml, callback);
        });
    }
};
