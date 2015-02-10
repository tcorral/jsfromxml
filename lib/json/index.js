var fs = require('fs');
var tmpl = '<{{name}}{{attributes}}>{{children}}</{{name}}>';
var forbiddenKeys = ['@', '>', '$'];
var reName = /{{name}}/gi;
var reAttributes = /{{attributes}}/;
var reChildren = /{{children}}/;

function addNodeKey(isArray, precontent, _key, key){
    if(isArray){
        precontent = precontent.replace(reName, _key);
    }else{
        if(forbiddenKeys.indexOf(key) !== -1){
            key = _key;
        }
        precontent = precontent.replace(reName, key);
    }
    return {
        content: precontent,
        key: key
    };
}

function addAttributes(attributes, precontent){
    var sAttributes;
    if(attributes){
        sAttributes = '';
        for(var attr in attributes){
            if(attributes.hasOwnProperty(attr)){
                sAttributes += ' ' + attr + '="' + attributes[attr] + '"';
            }
        }
        precontent = precontent.replace(reAttributes, sAttributes);
    }else{
        precontent = precontent.replace(reAttributes, '');
    }
    return precontent;
}

function getChildren(jsObject, node, _key, key){
    var children;
    if(_key === key){
        children = jsObject['>'];
    }else{
        children = node['>'];
    }
    return children;
}

function addChildren(children, precontent){
    var sChildren;
    var child;
    if(children){
        sChildren = '';
        for(var key in children){
            if(children.hasOwnProperty(key)){
                child = children[key];
                sChildren += retrieveNode(child, key);
            }
        }
        precontent = precontent.replace(reChildren, sChildren);
    }
    return precontent;
}

function retrieveNode(jsObject, _key){
    var isArray = Array.isArray(jsObject);
    var content = '';
    var node;
    var precontent;
    var children;
    var nodeData;

    if(typeof jsObject === 'string' || typeof jsObject === 'boolean' || typeof jsObject === 'number'){
        return tmpl.replace(reName, _key).replace(reAttributes, '').replace(reChildren, jsObject);
    }
    for(var key in jsObject){
        precontent  = tmpl;
        if(jsObject.hasOwnProperty(key)){
            node = jsObject[key];

            nodeData = addNodeKey(isArray, precontent, _key, key);

            precontent = nodeData.content;

            key = nodeData.key;

            precontent = addAttributes(node['@'], precontent);

            children = getChildren(jsObject, node, _key, key);

            precontent = addChildren(children, precontent);
        }
        content += precontent;
    }

    return content;
}

function js2xml(jsObject, callback){
    var arrXML = [];
    try{
        var content = retrieveNode(jsObject);
        arrXML.push('<?xml version="1.0"?>');
        arrXML.push(content);
        callback(null, arrXML.join(''));
    }catch(err){
        callback(err);
    }
}

module.exports = {
    js2xml: js2xml,
    readJSONFileAndReturnXML: function readJSONFileAndReturnXML(filepath, callback){
        fs.readFile(filepath, 'UTF-8', function (err, json){
            var jsObject;
            if(err){
                return console.log('Something went wrong!', err);
            }
            try{
                jsObject = JSON.parse(json);
            }catch(err){
                return callback(err);
            }
            js2xml(jsObject, callback);
        });
    }
};


