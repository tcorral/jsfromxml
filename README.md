# JSfromXML is a XML >< Javascript Object/JSON converter

[![Build Status](https://travis-ci.org/tcorral/jsfromxml.png)](https://travis-ci.org/tcorral/jsfromxml)
[![Code Climate](https://codeclimate.com/github/tcorral/jsfromxml/badges/gpa.svg)](https://codeclimate.com/github/tcorral/jsfromxml)

This module reads your XML files and converts them to a Javascript object. Yes, I know that there are a lot XML to JSON converters
and parsers but they did not work for me, because their leak of usability. The idea of this new converter is to
remain as easy and usable as possible. I´m open to include those improvements you think that could make it better.

## Installation
```
$ npm install jsfromxml
```

## How it works
I was very disappointed with the usage of other nodes so I decided to improve the api to access the elements, their
values and their attributes.

The root node will be a single member of the Javascript object.

The children nodes will be contained in an object with the key *">"*.

* If the key of one node exist just one time it will be an object with the key of the children name.
* If the key of one node exist more than one time it will be an array with all the objects inside.

The attributes will be contained in an object with the key *"@"*.

The value of the node will be contained as a string in a member with the key *"$"*.

Example XML code:

```xml
    <?xml version="1.0"?>
    <PurchaseOrder PurchaseOrderNumber="99503" OrderDate="1999-10-20">
        <Address Type="Shipping">
            <Name>Ellen Adams</Name>
            <Street>123 Maple Street</Street>
            <City>Mill Valley</City>
            <State>CA</State>
            <Zip>10999</Zip>
            <Country>USA</Country>
        </Address>
        <Address Type="Billing">
            <Name>Tai Yee</Name>
            <Street>8 Oak Avenue</Street>
            <City>Old Town</City>
            <State>PA</State>
            <Zip>95819</Zip>
            <Country>USA</Country>
        </Address>
        <DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>
        <Items>
            <Item PartNumber="872-AA">
                <ProductName>Lawnmower</ProductName>
                <Quantity>1</Quantity>
                <USPrice>148.95</USPrice>
                <Comment>Confirm this is electric</Comment>
            </Item>
            <Item PartNumber="926-AA">
                <ProductName>Baby Monitor</ProductName>
                <Quantity>2</Quantity>
                <USPrice>39.98</USPrice>
                <ShipDate>1999-05-21</ShipDate>
            </Item>
        </Items>
    </PurchaseOrder>
```
Example of the result:

```javascript
    {
       "PurchaseOrder":{
          "@":{
             "PurchaseOrderNumber":"99503",
             "OrderDate":"1999-10-20"
          },
          ">":{
             "Address":[
                {
                   "@":{
                      "Type":"Shipping"
                   },
                   ">":{
                      "Name":"Ellen Adams",
                      "Street":"123 Maple Street",
                      "City":"Mill Valley",
                      "State":"CA",
                      "Zip":"10999",
                      "Country":"USA"
                   }
                },
                {
                   "@":{
                      "Type":"Billing"
                   },
                   ">":{
                      "Name":"Tai Yee",
                      "Street":"8 Oak Avenue",
                      "City":"Old Town",
                      "State":"PA",
                      "Zip":"95819",
                      "Country":"USA"
                   }
                }
             ],
             "DeliveryNotes":"Please leave packages in shed by driveway.",
             "Items":{
                ">":{
                   "Item":[
                      {
                         "@":{
                            "PartNumber":"872-AA"
                         },
                         ">":{
                            "ProductName":"Lawnmower",
                            "Quantity":"1",
                            "USPrice":"148.95",
                            "Comment":"Confirm this is electric"
                         }
                      },
                      {
                         "@":{
                            "PartNumber":"926-AA"
                         },
                         ">":{
                            "ProductName":"Baby Monitor",
                            "Quantity":"2",
                            "USPrice":"39.98",
                            "ShipDate":"1999-05-21"
                         }
                      }
                   ]
                }
             }
          }
       }
    }
```

If you want to access the addresses for this purchase order you just need to do:

```javascript
var adresses = json.PurchaseOrder[">"].Address;
```

If you want to access the "PartNumber" attribute of the first item you just need to:

```javascript
var partNumber = json.PurchaseOrder[">"].Items[">"].Item[0]["@"].PartNumber;
```

If you want to access the "Delivery Notes" value you just need to:

```javascript
var partNumber = json.PurchaseOrder[">"].DeliveryNotes;
```

## Basic Usage - XML to JSON

```javascript
var parser = require('jsonfromxml');

parser.toJSONFromFile("path/to/a/xml/file.xml", function (err, json){
    // json contains a Javascript object with the content of the xml.
    console.log(json);
});
```

## Basic Usage - JSON to XML

```javascript
var parser = require('jsonfromxml');

parser.toXMLFromFile("path/to/a/xml/file.json", function (err, xml){
    // xml contains the xml in string format.
    console.log(xml);
});
```

## API

### toJsObject(xml, callback)

Parameters:
- xml - ```String```
- callback - ```Function```

Returns:
- Javascript Object - ```Object```

#### Usage

```javascript
parser.toJsObject(xml, callback);
```

### toJSON(xml, callback)

Parameters:
- xml - ```String```
- callback - ```Function```

Returns:
- JSON - ```String```

#### Usage

```javascript
parser.toJson(xml, callback);
```

### toJsObjectFromFile(filepath, callback)

Parameters:
- filepath - ```String```
- callback - ```Function```

Returns:
- Javascript Object - ```Object```

#### Usage

```javascript
parser.toJsObjectFromFile(filepath, callback);
```

### toJSONFromFile(filepath, callback)

Parameters:
- filepath - ```String```
- callback - ```Function```

Returns:
- Javascript Object - ```Object```

#### Usage

```javascript
parser.toJSONFromFile(filepath, callback);
```

### toXML(js, callback)

Parameters:
- js - ```Object```
- callback - ```Function```

Returns:
- XML - ```String```

#### Usage

```javascript
parser.toXML(js, callback);
```

### toXMLFromJSON(json, callback)

Parameters:
- json - ```String```
- callback - ```Function```

Returns:
- XML - ```String```

#### Usage

```javascript
parser.toXMLFromJSON(json, callback);
```

### toXMLFromFile(filepath, callback)

Parameters:
- filepath - ```String```
- callback - ```Function```

Returns:
- XML - ```String```

#### Usage

```javascript
parser.toXMLFromFile(filepath, callback);
```

## License
(The MIT License)

Copyright 2014 Tomas Corral. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.