var xmldoc = require('xmldoc');
var fs = require('fs');


function addNode(node, obj) {
    var arr = [];
    var _obj = {
        '@': node.attr,
        '$': node.val.replace(/\n/gi, '').trim(),
        '>': {}
    };

    if (obj[node.name] && !Array.isArray(obj[node.name])) {
        arr.push(obj[node.name]);
        obj[node.name] = arr;
        obj[node.name].push(_obj);
    } else {
        obj[node.name] = _obj;
    }

    node.children.forEach(function (child) {
        addNode(child, _obj['>']);
    });

    if (node.children.length === 0) {
        delete _obj['>'];
    }
    if (Object.keys(_obj['@']).length === 0) {
        delete _obj['@'];
    }
    if (_obj['$'].length === 0) {
        delete _obj['$'];
    }
    if (Object.keys(_obj).length === 1 && _obj['$'] != null) {
        obj[node.name] = _obj['$'];
    }
}

function xml2js(xml, callback) {
    var jsObj = {};
    var document = new xmldoc.XmlDocument(xml);

    try {
        addNode(document, jsObj);
        callback(null, jsObj);
    } catch (err) {
        return callback(err);
    }
}

module.exports = {
    xml2js: xml2js,
    readXMLFileAndReturnsJS: function readXMLFileAndReturnsJS(filepath, callback) {
        fs.readFile(filepath, 'UTF-8', function (err, xml) {
            if (err) {
                return console.log('Something went wrong!', err);
            }
            xml2js(xml, callback);
        });
    }
};

