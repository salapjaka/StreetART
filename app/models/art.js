const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArtSchema = new Schema({
  artName:                  String,
  photoPath:                String,

  location:   {type: { type:  String }, 
              coordinates:    [Number], 
              country:        String, 
              city:           String,
              street:         String,
              postalcode:     Number,
},
              
 
  artistName: {firstName:   String,
              lastName:     String,
              nickName:     String
              },
  
  dateTaken:                Date         
})
ArtSchema.index({ location: '2dsphere' });

const Art = mongoose.model('art', ArtSchema)

module.exports = Art;
