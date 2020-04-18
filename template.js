/**
 * source：https://github.com/ifyour/ipac/
 * update: #TEMPLATE_TIME#
 */

// Auto fallback proxy
const wallProxy = 'SOCKS5 127.0.0.1:1080; HTTP 127.0.0.1:1087;';

// const whiteDomains_demo = { com: { baidu: 1, qq: 1 } };
const whiteDomains = '#TEMPLATE_CONTENT#';

const nowallProxy = 'DIRECT;';
const direct = 'DIRECT;';
const ipProxy = 'DIRECT;';
const hasOwnProperty = Object.hasOwnProperty;
const subnetIpRangeList = [
  0, 1,
  167772160, 184549376, //10.0.0.0/8
  2886729728, 2887778304, //172.16.0.0/12
  3232235520, 3232301056, //192.168.0.0/16
  2130706432, 2130706688, //127.0.0.0/24
];

function checkIpv4(host) {
  // http://home.deds.nl/~aeron/regex/
  const reIpv4 = /^\d+\.\d+\.\d+\.\d+$/g;
  if (reIpv4.test(host)) return true;
}

function convertAddress(ipchars) {
  const bytes = ipchars.split('.');
  const result = (bytes[0] << 24) |
    (bytes[1] << 16) |
    (bytes[2] << 8) |
    (bytes[3]);
  return result >>> 0;
}

function isInSubnetRange(ipRange, intIp) {
  for (const i = 0; i < 10; i += 2) {
    if (ipRange[i] <= intIp && intIp < ipRange[i + 1])
      return true;
  }
}

function getProxyFromDirectIP(strIp) {
  const intIp = convertAddress(strIp);
  if (isInSubnetRange(subnetIpRangeList, intIp)) return direct;
  return ipProxy;
}

function isInDomains(domainDict, host) {
  let suffix;
  const pos1 = host.lastIndexOf('.');
  suffix = host.substring(pos1 + 1);
  if (suffix === 'cn' || suffix === 'localhost' || suffix === 'local')
    return true;
  const domains = domainDict[suffix];
  if (domains === undefined) return false;
  host = host.substring(0, pos1);
  let pos = host.lastIndexOf('.');
  // eslint-disable-next-line no-constant-condition
  while (1) {
    if (pos <= 0) return hasOwnProperty.call(domains, host);
    suffix = host.substring(pos + 1);
    if (hasOwnProperty.call(domains, suffix)) return true;
    pos = host.lastIndexOf('.', pos - 1);
  }
}

// eslint-disable-next-line no-unused-vars
function FindProxyForURL(url, host) {
  url = '' + url;
  host = '' + host;
  // eslint-disable-next-line no-undef
  if (isPlainHostName(host) === true) return direct;
  if (checkIpv4(host) === true) return getProxyFromDirectIP(host);
  if (isInDomains(whiteDomains, host) === true) return nowallProxy;
  return wallProxy;
}
