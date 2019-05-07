const Art = require('./models/art.js');
const uploadCloud = require('../config/cloudinary')
// const directionsService = new google.maps.DirectionsService;
// const directionsDisplay = new google.maps.DirectionsRenderer;

module.exports = function(app, passport) {

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
     let location = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
      };
    const {artName, artistName, dateTaken} = req.body;
    
    const newArt = new Art({artName, photoPath:req.file.url, artistName, dateTaken})
    newArt.save() 
    .then((art) => {
      res.redirect('/profile')
    })
    .catch((error) => {
      console.log(error)
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



  }

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}

// function startMap() {
//   const ironhackBCN = {
//   	lat: 41.3977381,
//   	lng: 2.190471916};
//   const map = new google.maps.Map(
//     document.getElementById('map'),
//     {
//       zoom: 5,
//       center: ironhackBCN
//     }
//   );
// }

// startMap();