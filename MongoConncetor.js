const mongoose = require('mongoose');
const dbproperties = require('./mongo.properties');

const dbUrl = `mongodb://${dbproperties.user}:${dbproperties.password}@`;
console.log(dbUrl);

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log("Datebase connected.");
});
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const SongSchema = new Schema ({
    id: ObjectId,
    rank: Number,
    name: String,
    singer: String,
    getFrom: String,
    createDt: Date,
    modifyDt: Date
});

mongoose.model('Song', SongSchema);

module.exports = mongoose;
// let songEntity = new SongModel({name:'任意門'});
// songEntity.save(err=>console.log(err));

// db.close(()=>console.log("DB closed."));