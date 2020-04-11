const path = require('path');
const { writeFileSync } = require('fs');
const YAML = require('yamljs');
const { format } = require('date-fns');

const TMP_FILE = './template';
const TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const NOW_TIME = format(new Date(), TIME_FORMAT);
const SAVE_CONTENT_ENCODE = 'utf-8';
const TEMPLATE_STRING = require(TMP_FILE);

// 输入
const DOMAINS_YML = './white_domains.yml';
// 输出
const SRC_FILE = './dist.js';


const resolveFile = file => path.join(__dirname, file);
const domainsObj = YAML.load(resolveFile(DOMAINS_YML));
const saveFile = (target, content) => writeFileSync(resolveFile(target), content, SAVE_CONTENT_ENCODE);
const result = TEMPLATE_STRING
  .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
  .replace(/#TEMPLATE_CONTENT#/g, JSON.stringify(domainsObj, null, 2));
saveFile(SRC_FILE, result);
console.log(`[${NOW_TIME}] Build Success!`);
