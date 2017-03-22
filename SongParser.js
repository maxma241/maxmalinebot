const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('./MongoConncetor');

const Song = mongoose.model('Song');
// 爬好樂迪 國語點播排行
request.get('http://www.holiday.com.tw/song/Billboard.aspx?kind=tc', (err, res, body) => {
    let $ = cheerio.load(body);
//   console.log($('#ctl00_ContentPlaceHolder1_dgSong tr').length);
    let songTable = $('#ctl00_ContentPlaceHolder1_dgSong tr');
    songTable.each((index, song) => {
        //本週0 上週1 週數2 點歌曲號3 歌名4 歌手5
        if(index !== 0 && index !== songTable.length-1 ) {
            let songRowData = $(song).find('td');
            let rank = $(songRowData).get(0);
            let name = $(songRowData).get(4);
            let singer = $(songRowData).get(5);
            let songObj = {
                rank: $(rank).text().replace(/ |\r|\n/g,''),
                name: $(name).text().replace(/ /g,''),
                singer: $(singer).text().replace(/ |\r|\n/g,''),
                getFrom: 'holiday',
                createDt: new Date()
            };
            //console.log(songObj);
            new Song(songObj).save(err => err? console.log(err) : console.log("insert success"));
        }
    });
    mongoose.connection.close();
})
.on('error', err => console.log(err));
