const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const yamljs = require('yamljs');
const { format, utcToZonedTime } = require('date-fns-tz');


const TEMPLATE = './template.js';
// TODO: https_template extends template
const HTTPS_TEMPLATE = './https_tmp.js';
const DOMAINS_YML = './white_domains.yml';

generatePac(TEMPLATE, DOMAINS_YML, './dist.js');
generatePac(HTTPS_TEMPLATE, DOMAINS_YML, './dist_https.js');

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
  const CONTENT_ENCODE = 'utf-8';
  const NOW_TIME = format(ZONE_DATE, TIME_FORMAT);

  const resolveFile = file => path.join(__dirname, file);
  const saveFile = (target, content) => writeFileSync(
    resolveFile(target), content, CONTENT_ENCODE
  );
  const buffer = readFileSync(resolveFile(template));
  const templateString = buffer.toString('utf8');
  const domains = yamljs.load(resolveFile(domainsData));
  const content = templateString
    .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
    .replace(/'#TEMPLATE_CONTENT#'/g, JSON.stringify(domains, null, 2));

  saveFile(dist, content);
  console.log(`[${NOW_TIME}] 🗻 iPac ${dist} Build Success! `);
}
