# 🗻 iPac

[![gitpod logo](https://img.shields.io/badge/gitpod-ready-blue?logo=gitpod)](https://gitpod.io/#https://github.com/ifyour/ipac)
[![npm](https://badgen.net/npm/v/@ifyour/ipac)](https://unpkg.com/@ifyour/ipac)
[![contributors](https://badgen.net/github/contributors/ifyour/ipac)](https://github.com/ifyour/ipac/graphs/contributors)
[![prs](https://badgen.net/github/prs/ifyour/ipac)](https://github.com/ifyour/ipac/pulls?q=is%3Apr+sort%3Aupdated-desc+)
[![license](https://badgen.net/github/license/ifyour/ipac)](https://github.com/ifyour/ipac/blob/master/LICENSE)

> Another China domain whitelist for the SwitchyOmega plugin.

## Feature

- Custom server IP address
- Custom port
- Cached query result set
- Service rollback downgrade
- Easy-to-maintain website library

## Usage

<p align="left">
  <img
    width="65%"
    alt="usage demo"
    src="https://user-images.githubusercontent.com/15377484/79173191-66b33180-7e29-11ea-9502-94de0231a3f9.jpg"
  >
</p>

- Open SwitchyOmega and select `New Profile`
- Select the `PAC profile` option with any name you want.
- PAC web site filled in `https://ipac.now.sh/` or `https://unpkg.com/@ifyour/ipac`
- Click `update immediately`, then save

## API

### GET `/`

| Param  | Type     | Default   | Require | Description             |
| ------ | -------- | --------- | ------- | ----------------------- |
| socks5 | `number` | 1080      | false   | SOCKS5 port, short: `s` |
| http   | `number` | 1087      | false   | HTTP port, short: `h`   |
| ip     | `string` | 127.0.0.1 | false   | Default proxy host      |

**Example**

- https://ipac.now.sh/?ip=192.168.199.214&h=1234
- https://ipac.now.sh/?socks5=1234&http=4321
- https://ipac.now.sh/?s=1234&h=4321
- https://ipac.now.sh/?s=1234
- https://ipac.now.sh/?h=4321

Note: `https://unpkg.com/@ifyour/ipac` does not support changing proxy IP and port numbers.

## License

Licensed under [The WTFPL License](./LICENSE)
