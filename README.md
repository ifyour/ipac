[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready-blue?logo=gitpod)](https://gitpod.io/#https://github.com/ifyour/ipac)

# iPac

> Another China domain whitelist for the SwitchyOmega plugin.

## Usage

<p align="left">
<img  width="65%" alt="usage demo" src="https://user-images.githubusercontent.com/15377484/79173191-66b33180-7e29-11ea-9502-94de0231a3f9.jpg">
</p>

- Open SwitchyOmega and select `New Profile`
- Select the `PAC profile` option with any name you want.
- PAC web site filled in `https://ipac.now.sh/`
- Click `update immediately`, then save

## API

### GET `/api/port` or GET `/`

Param | Type | Default | Require | Details
------| -----| ------ | -------- | --------
socks5 | `string` | 1080 | false | SOCKS5 port, Short: `s`
http | `string` | 1087 | false | HTTP port, Short: `h`


**Example**
- https://ipac.now.sh/api/port/?socks5=123&http=4321
- https://ipac.now.sh/?s=1234&h=4321
- https://ipac.now.sh/?s=1234
- https://ipac.now.sh/?h=4321


## License

Licensed under [The WTFPL License](./LICENSE)
