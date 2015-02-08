'use strict';

var grunt = require('grunt');
var xml = require('../src');


exports.jsonfromxml = {
    toJSONFromFile: function (test){
        test.expect(1);
        xml.toJSONFromFile('test/fixtures/example.xml', function (err, data){
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

        xml.toJSON(strXml, function (err, data){
            var strJSON = JSON.stringify(data);
            var expectedJson;
            grunt.file.write('test/generated/example.json', strJSON);
            expectedJson = grunt.file.read('test/expected/example.json');

            test.equals(strJSON.trim(), expectedJson.trim());
            test.done();
        });
    }
};