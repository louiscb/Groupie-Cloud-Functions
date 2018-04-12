/**
 *   URL HERE!!!
 *
 *   https://us-central1-testing-project-df25e.cloudfunctions.net/dbGroupsCreate
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */

'use strict';

const glob = require("glob");

const camelCase = require("camelcase");

const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**'});

for (let f=0,fl=files.length; f<fl; f++) {
    const file = files[f];
    const functionName = camelCase(file.slice(0, -5).split('/').join('_')); // Strip off '.f.js'

    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
        //how does this line work, and how is it similar to
        exports[functionName] = require(file);
    }
}