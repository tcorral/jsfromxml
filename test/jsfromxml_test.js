'use strict';

var grunt = require('grunt');
var xml = require('../src');


exports.jsonfromxml = {
    toJsObjectFromFile: function (test) {
        test.expect(1);
        xml.toJsObjectFromFile('test/fixtures/example.xml', function (err, data) {
            var strJSON = JSON.stringify(data);
            var expectedJson;
            grunt.file.write('test/generated/example.json', strJSON);
            expectedJson = grunt.file.read('test/expected/example.json');

            test.equals(strJSON.trim(), expectedJson.trim());
            test.done();
        });
    },
    toJsObject: function (test) {
        test.expect(1);
        var strXml = grunt.file.read('test/fixtures/example.xml');

        xml.toJsObject(strXml, function (err, data) {
            var strJSON = JSON.stringify(data);
            var expectedJson;
            grunt.file.write('test/generated/example.json', strJSON);
            expectedJson = grunt.file.read('test/expected/example.json');

            test.equals(strJSON.trim(), expectedJson.trim());
            test.done();
        });
    },
    toJSON: function (test){
        test.expect(1);
        var strXml = grunt.file.read('test/fixtures/example.xml');

        xml.toJSON(strXml, function (err, data) {
            var expectedJson;
            grunt.file.write('test/generated/example.json', data);
            expectedJson = grunt.file.read('test/expected/example.json');

            test.equals(data.trim(), expectedJson.trim());
            test.done();
        });
    },
    toJSONFromFile: function (test){
        test.expect(1);

        xml.toJSONFromFile('test/fixtures/example.xml', function (err, data) {
            var expectedJson;
            grunt.file.write('test/generated/example.json', data);
            expectedJson = grunt.file.read('test/expected/example.json');

            test.equals(data.trim(), expectedJson.trim());
            test.done();
        });
    },
    toXML: function (test) {
        test.expect(1);
        var strJSON = grunt.file.read('test/fixtures/example.json');

        xml.toXML(JSON.parse(strJSON), function (err, xml) {
            var expectedXML;
            grunt.file.write('test/generated/example.xml', xml);
            expectedXML = grunt.file.read('test/expected/example.xml');

            test.equals(xml.trim(), expectedXML.trim());
            test.done();
        });
    },
    toXMLFromJSON: function (test) {
        test.expect(1);
        var strJSON = grunt.file.read('test/fixtures/example.json');

        xml.toXMLFromJSON(strJSON, function (err, xml) {
            var expectedXML;
            grunt.file.write('test/generated/example.xml', xml);
            expectedXML = grunt.file.read('test/expected/example.xml');

            test.equals(xml.trim(), expectedXML.trim());
            test.done();
        });
    },
    toXMLFromFile: function (test) {
        test.expect(1);

        xml.toXMLFromFile('test/fixtures/example.json', function (err, xml) {
            var expectedXML;
            grunt.file.write('test/generated/example.xml', xml);
            expectedXML = grunt.file.read('test/expected/example.xml');

            test.equals(xml.trim(), expectedXML.trim());
            test.done();
        });
    }
};