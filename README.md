<img src="https://s3.postimg.org/kr13pm9qr/raspberry-pi-logo.png" alt="Raspberry PI logo" height="150" title="power-heart-beat-pi" align="right" />

# power-heart-beat-pi

`power-heart-beat-pi` is a Node.js program that I run on my Raspberry Pi.

This helps me track when electricity :bulb: or internet :globe_with_meridians: connection is down at my home.
Usually is helpful when I'm not at home and planning to go home :running:.

## How to install node.js on Raspberry PI?
[nvm](https://github.com/creationix/nvm) works great on Raspberry PI as well.

## How to deploy?

```sh
# copy paste .env.example to .env
$ cp .env.example .env

# update the variables in .env
$ vim .env

# install pm2
$ npm i -g pm2

# install local deps
$ yarn

# start the process
$ yarn prod:start
```

## How to start pm2 on boot?
pm2 has great documentation about how to do start the node process on boot over [here](http://pm2.keymetrics.io/docs/usage/startup/).


## License

MIT
