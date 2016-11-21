#!/usr/bin/env node
const figlet = require('figlet');
const chalk = require('chalk');
const program = require('commander');
const prompt = require('prompt');
const request = require('request');
const Spinner = require('clui').Spinner;
const reqMagnet = require('../lib/req');
const reqSeries = require('../lib/series');
const keypress = require('keypress');
const argv = process.argv;
let page = 1;
let spage = 0;
console.log(
  chalk.bold.red(
    figlet.textSync('Mr. Robot', {
    horizontalLayout: 'full'
  })
));
program.version('0.0.1');
program.on('--help', ()=> {
  console.log(chalk.cyan('  1.Mr.Robot 你的贴身助手！'));
  console.log(chalk.cyan('  2.对话过程中如需退出，请输入英文: exit！'));
  console.log(chalk.cyan('  3.作者信息: Youko<topgrd@outlook.com>'));
  console.log(chalk.cyan('  4.发布时间: 2016-11-16'));
});

program
  .command('magnet')
  .alias('m')
  .description('search magnet link to download!')
  .option('-n, --name [keyword]', 'the keyword for search.')
  .action(option => {
      const loading = new Spinner('search ' + option.name + '...');
      reqMagnet(page, option.name, loading);
      keypress(process.stdin);

      process.stdin.on('keypress', function (ch, key) {
        //console.log('got "keypress"', key);
        if (key && key.name == 'n') {
          page = page + 1;
          reqMagnet(page, option.name, loading);
        }else if (key && key.ctrl && key.name == 'c') {
          process.stdin.pause();
        }

      });

      process.stdin.setRawMode(true);
      process.stdin.resume();
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('\t$ do magnet -n WestWorld');
    console.log('\t$ do m -n WestWorld');
  });

  program
    .command('series')
    .alias('s')
    .description('look The TV Series Rank on terminal.')
    .option('-n, --name [name]', 'the name for the TV series.')
    .action(option => {
        const loading = new Spinner('loading' + '...');
        reqSeries(spage, loading);
        keypress(process.stdin);

        process.stdin.on('keypress', function (ch, key) {
          //console.log('got "keypress"', key);
          if (key && key.name == 'n') {
            spage = spage + 1;
            reqSeries(spage, loading);
          }else if (key && key.ctrl && key.name == 'c') {
            process.stdin.pause();
          }

        });

        process.stdin.setRawMode(true);
        process.stdin.resume();
    })
    .on('--help', function() {
      console.log('  Examples:');
      console.log('');
      console.log('\t$ do series');
      console.log('\t$ do s');
    });

program.parse(argv);
