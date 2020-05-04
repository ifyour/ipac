const { writeFileSync, readFileSync } = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const { format, utcToZonedTime } = require('date-fns-tz');

const contentExtends = require('./contentExtends');
const TEMPLATE = './template.js';
const HTTPS_TEMPLATE = './https_tmp.js';
const DOMAINS_YML = './white_domains.yml';

contentExtends({
  source: TEMPLATE,
  target: HTTPS_TEMPLATE,
  contentFrom: 'SOCKS5 127.0.0.1:1080;',
  contentTo: 'HTTPS haotizi.tk:443;',
});
generatePac(TEMPLATE, DOMAINS_YML, '../dist/index.js');
generatePac(HTTPS_TEMPLATE, DOMAINS_YML, '../dist/https.js');

/**
 * generatePac
 *
 * @desc template + datasource  = pac file
 * @param template [string] : teplatefile
 * @param domainsData [string]: yml files
 * @param dist [string]: dist places
 */
function generatePac(template, domainsData, dist) {
  const TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
  const ZONE_DATE = utcToZonedTime(new Date(), 'Asia/Shanghai');
  const NOW_TIME = format(ZONE_DATE, TIME_FORMAT);
  const resolve = file => path.join(__dirname, file);
  const buffer = readFileSync(resolve(template));
  const templateString = buffer.toString('utf8');
  const domains = yamljs.load(resolve(domainsData));
  const content = templateString
    .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
    .replace(/'#TEMPLATE_CONTENT#'/g, JSON.stringify(domains, null, 2));
  writeFileSync(resolve(dist), content, 'utf-8');
  console.log(`[${NOW_TIME}] 🗻 iPac ${dist} Build Success! `);
}
