// TODO: exntes template.js
module.exports = `
/**
 * source：https://github.com/ifyour/ipac/
 * update: #TEMPLATE_TIME#
 */

// Auto fallback proxy
var wall_proxy = "SOCKS5 127.0.0.1:1080; SOCKS5 192.168.199.214:1080; HTTPS haotizi.tk:443; HTTP 127.0.0.1:1087;";

// var demo_obj = { com: { baidu: 1, qq: 1 } };
var white_domains = '#TEMPLATE_CONTENT#';

var nowall_proxy = "DIRECT;";
var direct = "DIRECT;";
var ip_proxy = "DIRECT;";
var hasOwnProperty = Object.hasOwnProperty;
var subnetIpRangeList = [
  0, 1,
  167772160, 184549376,	//10.0.0.0/8
  2886729728, 2887778304,	//172.16.0.0/12
  3232235520, 3232301056,	//192.168.0.0/16
  2130706432, 2130706688	//127.0.0.0/24
];

function check_ipv4(host) {
  // http://home.deds.nl/~aeron/regex/
  var re_ipv4 = /^\\\d+\\\.\\\d+\\\.\\\d+\\\.\\\d+$/g;
  if (re_ipv4.test(host)) return true;
}

function convertAddress(ipchars) {
  var bytes = ipchars.split('.');
  var result = (bytes[0] << 24) |
    (bytes[1] << 16) |
    (bytes[2] << 8) |
    (bytes[3]);
  return result >>> 0;
}

function isInSubnetRange(ipRange, intIp) {
  for (var i = 0; i < 10; i += 2) {
    if (ipRange[i] <= intIp && intIp < ipRange[i + 1])
      return true;
  }
}

function getProxyFromDirectIP(strIp) {
  var intIp = convertAddress(strIp);
  if (isInSubnetRange(subnetIpRangeList, intIp)) return direct;
  return ip_proxy;
}

function isInDomains(domain_dict, host) {
  var suffix;
  var pos1 = host.lastIndexOf('.');
  suffix = host.substring(pos1 + 1);
  if (suffix == "cn" || suffix == "localhost" || suffix == "local")
    return true;
  var domains = domain_dict[suffix];
  if (domains === undefined) return false;
  host = host.substring(0, pos1);
  var pos = host.lastIndexOf('.');
  while (1) {
    if (pos <= 0) return hasOwnProperty.call(domains, host);
    suffix = host.substring(pos + 1);
    if (hasOwnProperty.call(domains, suffix)) return true;
    pos = host.lastIndexOf('.', pos - 1);
  }
}

function FindProxyForURL(url, host) {
  url = "" + url;
  host = "" + host;
  if (isPlainHostName(host) === true) return direct;
  if (check_ipv4(host) === true) return getProxyFromDirectIP(host);
  if (isInDomains(white_domains, host) === true) return nowall_proxy;
  return wall_proxy;
}
`
