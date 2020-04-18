/**
 * source：https://github.com/ifyour/ipac/
 * update: #TEMPLATE_TIME#
 */

// Auto fallback proxy
let wallProxy = 'SOCKS5 127.0.0.1:1080; HTTP 127.0.0.1:1087;';

// var demo_obj = { com: { baidu: 1, qq: 1 } };
let whiteDomains = '#TEMPLATE_CONTENT#';

let nowallProxy = 'DIRECT;';
let direct = 'DIRECT;';
let ipProxy = 'DIRECT;';
let hasOwnProperty = Object.hasOwnProperty;
let subnetIpRangeList = [
  0, 1,
  167772160, 184549376, //10.0.0.0/8
  2886729728, 2887778304, //172.16.0.0/12
  3232235520, 3232301056, //192.168.0.0/16
  2130706432, 2130706688, //127.0.0.0/24
];

function checkIpv4(host) {
  // http://home.deds.nl/~aeron/regex/
  let reIpv4 = /^\d+\.\d+\.\d+\.\d+$/g;
  if (reIpv4.test(host)) return true;
}

function convertAddress(ipchars) {
  let bytes = ipchars.split('.');
  let result = (bytes[0] << 24) |
    (bytes[1] << 16) |
    (bytes[2] << 8) |
    (bytes[3]);
  return result >>> 0;
}

function isInSubnetRange(ipRange, intIp) {
  for (let i = 0; i < 10; i += 2) {
    if (ipRange[i] <= intIp && intIp < ipRange[i + 1])
      return true;
  }
}

function getProxyFromDirectIP(strIp) {
  let intIp = convertAddress(strIp);
  if (isInSubnetRange(subnetIpRangeList, intIp)) return direct;
  return ipProxy;
}

function isInDomains(domainDict, host) {
  let suffix;
  let pos1 = host.lastIndexOf('.');
  suffix = host.substring(pos1 + 1);
  if (suffix == 'cn' || suffix == 'localhost' || suffix == 'local')
    return true;
  let domains = domainDict[suffix];
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
