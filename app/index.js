const Art = require('./models/art.js');
const uploadCloud = require('../config/cloudinary')
// const directionsService = new google.maps.DirectionsService;
// const directionsDisplay = new google.maps.DirectionsRenderer;

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
   app.get('/', function(req, res) {
      Art.find().then(arts=>{
        res.render('index.hbs', { arts });
      }).catch(err=>console.error(err))
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
      Art.find({postedBy: req.user._id}).then(artFromDb=>{
          res.render('profile.hbs', {
              user : req.user,
              artInHBS : artFromDb
          });
      });
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });


  app.get('/art', (req, res, next) => {
    Art.find().then(artFromDb=>{
      res.render('art', {artInHBS : artFromDb})
    })
  });

  app.get('/add', isLoggedIn, (req, res, next) => {
    res.render ('add')
  })


  app.post('/add', uploadCloud.single('photo'), (req, res, next) => {
     console.log(req.file, req.body, '$$%%$%%')
     
    const {artName, artistName, dateTaken,  latitude, longitude} = req.body;
    //let location = { latitude: req.body.latitude, longitude: req.body.longitude } 
    // console.log({
    //   artName, 
    //   photoPath:req.file.url, 
    //   latitude,
    //   longitude, 
    //   artistName, 
    //   dateTaken,
    //   postedBy: req.user._id
    // })
    const newArt = new Art({
        artName, 
        photoPath:req.file.url, 
        latitude,
        longitude, 
        artistName, 
        dateTaken,
        postedBy: req.user._id
      })
    newArt.save() 
    .then((art) => {
      res.redirect('/profile')
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
  });


  
  app.get('/edit', isLoggedIn, (req, res, next) => {
    let id =req.query.art_id
    Art.findOne({_id: id})
    .then((art) => {
      res.render("edit", {art});
    })
    .catch((error) => {
      console.log(error);
    })
  });

  app.post('/edit', uploadCloud.single('photo'), (req, res, next)=>{
    console.log("where are you???", req.body)
    let id = req.query.art_id
    let stuff = req.body
    if(req.file){
      stuff.photoPath = req.file.url
    }
    Art.findByIdAndUpdate(id, stuff)
    .then(updatedArt=>{
      res.redirect('/profile')
    })
    .catch((error) => {
      console.log(error)
    })
  })


  app.get('/delete', isLoggedIn, (req, res, next) => {
    //Art.findByIdAndDelete(req.query.art_id)
      //Art.findByIdAndRemove(req.query.art_id)
      Art.remove({_id:req.query.art_id})
      .then(deletedArt=>{
      res.redirect('/profile')
      })
      .catch((error) => {
        console.log(error);
      })
    });

    app.get('/add', isLoggedIn, (req, res, next) => {
      res.render ('add')
    })
 

  // app.get('/:id', (req, res, next) => {
  //   console.log(" id ",req.params, req.query, req.body)
  //   ///hiiiiii  { id: '5cc72b029dbf42248cecc279' } {} {}
  //   Art.findById(req.params.id).then(artFromDb=>{
  //     res.render('artdetail', {artInHBS : artFromDb})
  //   })
  // });
  app.get('/art/:artId', (req, res, next) => {
    Art.findById(req.params.artId)
    .then(artFromDb=> {
      console.log('in hererererer?', artFromDb, req.params)
    res.render('artdetail',{artInHBS: artFromDb});
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    })
  });

  app.get('/api', (req, res, next) => {
    Art.find({}, (error, artFromDb) => {
      if (error) { 
        next(error); 
      } else { 
        res.status(200).json({ artInHBS: artFromDb });
      }
    });
  });
  
  // to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
  app.get('/api/:id', (req, res, next) => {
    let artId = req.params.id;
    Art.findOne({_id: artId}, (error, oneArtFromDB) => {
      if (error) { 
        next(error) 
      } else { 
        res.status(200).json({ artInHBS: oneArtFromDB }); 
      }
    });
  });

  // app.post('/', (req, res, next) => {

  //   // add the location object
  //     let location = {
  //     type: 'Point',
  //     coordinates: [req.body.longitude, req.body.latitude]
  //     };
      
  //     const newArt = new Art({
  //     name:        req.body.artName,
  //     location:    location
  //     });
    
  //     newArt.save((error) => {
  //     if (error) { 
  //       next(error); 
  //     } else { 
  //       res.redirect('profile');
  //     }
  //     })
  //   });
  }

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}


