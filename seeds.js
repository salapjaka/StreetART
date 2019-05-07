const mongoose = require('mongoose');
const Art = require('./app/models/art');

const dbName = 'street-art';
mongoose.connect(`mongodb://localhost/${dbName}`);

const art = [
            {
            artName:                  'color',       
            location:   {country:     'USA', 
                        city:         'Miami',
                        street:       'somewhere',
                        postalcode:   '33181',
                        },
            photo:      {data:        'Buffer',
                        contentType:  'String'
                        },
            artistName: {firtsName:   'Don',
                        lastName:     'Pablo',
                        nickName:     'Pablo'
                        },
            date:                     'date'
                      },
                    
                      {
            artName:                  'yellow',
            location:   {country:     'USA', 
                        city:         'Fort Lauderdale',
                        street:       'somewhere',
                        postalcode:   '33000',
                        },
            photo:      {data:        'Buffer',
                        contentType:  'String'
                        },
            artistName: {firtsName:   'Don',
                        lastName:     'Pablo',
                        nickName:     'Pablo'
                        },
            date:                     'date'
                      },
            
                      {
            artName:                  'Eiffel',
            location:   {country:     'Paris', 
                        city:         'France',
                        street:       'somewhere',
                        postalcode:   '22222',
                        },
            photo:      {data:        'Buffer',
                        contentType:  'String'
                        },
            artistName: {firtsName:   'Dr',
                        lastName:     'Pablo',
                        nickName:     'Pablo'
                        },
            date:                     'date'
                      },

                           {
            artName:                  'Eiffel',
            location:   {country:     'Paris', 
                        city:         'France',
                        street:       'somewhere',
                        postalcode:   '22222',
                        },
            photo:      {data:        'Buffer',
                        contentType:  'String'
                        },
            artistName: {firtsName:   'Dr',
                        lastName:     'Pablo',
                        nickName:     'Pablo'
                        },
            date:                     'date'
                      },
                      {
            artName:                  'Eiffel',
            location:   {country:     'Paris', 
                        city:         'France',
                        street:       'somewhere',
                        postalcode:   '22222',
                        },
            photo:      {data:        'Buffer',
                        contentType:  'String'
                        },
            artistName: {firtsName:   'Dr',
                        lastName:     'Pablo',
                        nickName:     'Pablo'
                        },
            date:                     'date'
                      },
]

Art.create(art, (err) => {
  if (err) {throw(err) }
  console.log(`Created ${art.length} art`)
  // mongoose.connection.close();
});