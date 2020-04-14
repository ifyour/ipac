const { writeFileSync, readFileSync } = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const axios = require('axios');
const get = require('lodash.get');
const { format, utcToZonedTime } = require('date-fns-tz');


function generatePac(
  socks5Port,
  httpPort,
  s = 1080,
  h = 1087,
) {
  const TEMPLATE = '../template.js';
  const DOMAINS_YML = '../white_domains.yml';
  const TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

  return new Promise(async (resolve, reject) => {
    try {
      const repoDetail = await axios.get('https://api.github.com/repos/ifyour/ipac/branches/master');
      const lastBuildTime = get(repoDetail, 'data.commit.commit.committer.date') || new Date();

      const ZONE_DATE = utcToZonedTime(lastBuildTime, 'Asia/Shanghai');
      const NOW_TIME = format(ZONE_DATE, TIME_FORMAT);

      const domains = yamljs.load(path.resolve(__dirname, DOMAINS_YML));
      const buffer = readFileSync(path.resolve(__dirname, TEMPLATE));

      const data = buffer.toString('utf8')
        .replace(/#TEMPLATE_TIME#/g, NOW_TIME)
        .replace(/'#TEMPLATE_CONTENT#'/g, JSON.stringify(domains, null, 2))
        .replace(/:1080;/g, `:${socks5Port || s};`)
        .replace(/:1087;/g, `:${httpPort || h};`);

      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = async (req, res) => {
  const { query: { socks5, http, s, h } } = req;
  res.setHeader('content-type', 'application/javascript; charset=utf-8');
  const pacContent = await generatePac(socks5, http, s, h);
  res.send(pacContent);
}
