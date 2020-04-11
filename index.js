const path = require('path');
const { writeFileSync } = require('fs');
const YAML = require('yamljs');
const { format, utcToZonedTime } = require('date-fns-tz');

// source + tempate  = dist.js
const DOMAINS_YML = './white_domains.yml';
const STRING_FILE = './templateString';
const SRC_FILE = './dist.js';

const TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const ZONE_DATE = utcToZonedTime(new Date(), 'Asia/Shanghai');
const NOW_TIME = format(ZONE_DATE, TIME_FORMAT);
const SAVE_CONTENT_ENCODE = 'utf-8';
const TEMPLATE_STRING = require(STRING_FILE);
const resolveFile = file => path.join(__dirname, file);
const saveFile = (target, content) => writeFileSync(resolveFile(target), content, SAVE_CONTENT_ENCODE);

const domains = YAML.load(resolveFile(DOMAINS_YML));
const result = TEMPLATE_STRING
  .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
  .replace(/'#TEMPLATE_CONTENT#'/g, JSON.stringify(domains, null, 2));

saveFile(SRC_FILE, result);
console.log(`[${NOW_TIME}] 🗻 iPac Build Success! `);
