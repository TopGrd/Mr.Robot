const prompt = require('prompt');
const request = require('request');
const cheerio = require('cheerio');
const Table = require('cli-table');
const uri = 'http://www.btmeet.org/search/';

const reqMagnet = function (page, name, loading) {
  loading.start();
  let url = uri + name + '/' + page + '-1.html';
  //console.log(url);
  url = encodeURI(url);
  request({
    url: url
  },function(err, res, body) {
    if (err) {
      console.log(err);
    }
    var $ = cheerio.load(body);
    var item = $('.item-title h3').children('a');
    console.log();
    let table = new Table({
      head: ['name', 'magnet']
    });
    let index = 1;
    let descArr = [];
    item.each(function(ele){
      let txt = $(this).text();
      var href = $(this).attr('href');
      let s = txt.substr(15);
      let rel = s.replace(/\)\)/, ')');
      let st = eval(rel);
      st = st.replace(/\<(\/*)b\>/g, '');
      let magnet = href.split('.')[0].split('/')[2];
      table.push([st, 'magnet:?xt=urn:btih:' + magnet]);
    });
    console.log(table.toString());
    console.log('下一页请按n');
    loading.stop();
  });
};
module.exports = reqMagnet;
