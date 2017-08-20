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

# install local deps
$ yarn

# generate crontab command
$ node deploy/generate-crontab-cmd.js
# * * * * * NODE_ENV=production /home/pi/.nvm/versions/node/v8.4.0/bin/node /home/pi/power-heart-beat-pi/src/index.js >> /home/pi/cron-logs/power-heart-beat-pi.log 2>&1

# paste it into crontab
$ crontab -e
```

## License

MIT
