#!/usr/bin/env node

const program = require('commander');
const path = require('path')
const download = require('download-git-repo');
const ora = require('ora');
const rm = require('rimraf').sync;
const exists = require('fs').existsSync;


let spinner = ora('mode: down by url. Downloading ...');

spinner.start();

const remoteUrl = 'gitlab:http://git.souche.com:bigBusiness/dafengche-followRuleSet';

const savePath = path.join(__dirname, 'taoxj');

if (exists(savePath)) rm(savePath)
download(remoteUrl, savePath, { clone: false }, err => {
  spinner.stop();
  if (err) {
    spinner = ora('mode: down by gitClone. Downloading again ...');
    download(remoteUrl, savePath, { clone: true }, err => {
      spinner.stop();
      if (err) {
        console.log('Failed to download repo ' + remoteUrl + ': ' + err.message.trim());
        return;
      }
      console.log('success');
    });
    return;
  }
  console.log('success');
});
