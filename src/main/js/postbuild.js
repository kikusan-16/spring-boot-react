const path = require('path');
const fs = require('fs-extra');

const BUILD_DIR = path.join(__dirname, './build');
const STATIC_DIR = path.join(__dirname, '../resources/static');

fs.emptyDirSync(STATIC_DIR);
fs.copySync(BUILD_DIR, STATIC_DIR);