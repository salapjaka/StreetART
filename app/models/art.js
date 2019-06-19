const mongoose = require('mongoose')
const moment = require('moment');
const Schema = mongoose.Schema

const ArtSchema = new Schema({
  artName:                  String,
  photoPath:                String,
  latitude:                 Number,
  longitude:                Number,
     
 
  artistName: {firstName:   String,
              lastName:     String,
              nickName:     String
              },
  
  dateTaken:               Date,
  postedBy: Schema.Types.ObjectId         
})
// ArtSchema.index({ location: '2dsphere' });


const Art = mongoose.model('art', ArtSchema)

module.exports = Art;
