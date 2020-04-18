const { readFileSync } = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const axios = require('axios');
const get = require('lodash.get');
const { format, utcToZonedTime } = require('date-fns-tz');

function generatePac({ socks5, http, s = 1080, h = 1087, ip = '127.0.0.1' }) {
  const TEMPLATE = '../template.js';
  const DOMAINS_YML = '../white_domains.yml';
  return new Promise((resolve, reject) => {
    try {
      const ZONE_DATE = utcToZonedTime(new Date(), 'Asia/Shanghai');
      const NOW_TIME = format(ZONE_DATE, 'yyyy-MM-dd HH:mm:ss');
      const domains = yamljs.load(path.resolve(__dirname, DOMAINS_YML));
      const buffer = readFileSync(path.resolve(__dirname, TEMPLATE));
      const data = buffer.toString('utf8')
        .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
        .replace(/'#TEMPLATE_CONTENT#'/g, JSON.stringify(domains, null, 2))
        .replace(/:1080;/g, `:${socks5 || s};`)
        .replace(/:1087;/g, `:${http || h};`)
        .replace(/127\.0\.0\.1/g, ip);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = async (req, res) => {
  const { query } = req;
  res.setHeader('content-type', 'application/javascript; charset=utf-8');
  const pacContent = await generatePac(query);
  res.send(pacContent);
};
