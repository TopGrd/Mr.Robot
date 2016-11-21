const prompt = require('prompt');
const request = require('request');
const cheerio = require('cheerio');
const Table = require('cli-table');
const uri = 'http://www.ttmeiju.com/summary.html';
const _ = require('lodash');
let index = 1;
const reqSeries = function (page, loading) {
  loading.start();
  request(uri, function (err, res, body) {
    let $ = cheerio.load(body);
    let arr = [];
    $('td').children('a').each(function (ele) {
      arr.push($(this).text());
    });
    let brr = _.chunk(arr, 15);
    let table = new Table({
      head: ['index', 'name']
    });
    console.log(brr.length);

    for (let x = 0; x < brr[page].length; x++) {
      table.push([index++, brr[page][x]]);
    }

    console.log(table.toString());
    console.log('下一页请按n');
    loading.stop();
  })
}

module.exports = reqSeries;
