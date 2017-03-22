const Koa = require('koa');
const router = require('koa-router')();
const mongoose = require('./MongoConncetor');

const app = new Koa();
const Song = mongoose.model('Song');
//set root path
router.get('/', async function(ctx) {
    this.body = 'Hello World';
});

router.get('/songsRank/v1/list', async function(ctx) {
    this.body = await Song.find({}).exec();
});

app.use(router.routes());
app.listen(3000);