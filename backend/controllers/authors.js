// const express = require('express');

// // create Route instance for Authors
// const router = express.Router();

// // Load Author model

// import authorModel from '../models/authors';

// router.get('/test', (req, res) => res.json({ msg: 'Author Works!' }));

// router.get('/', (req, res) => {
//   // Code to fetch the polls.
//   var authorObject = new authorModel();
//   // Calling our model function.
//   authorObject.getAllAuthors(function (err, authorResponse) {
//     if (err) {
//       return res.json({
//         "responseCode": 1,
//         "responseDesc": authorResponse
//       });
//     }
//     res.json({
//       "responseCode": 0,
//       "responseDesc": "Success",
//       "data": authorResponse
//     });
//   });
// });

// router.get('/:id', (req, res) => {
//   Author.findById(req.params.id)
//     .then(author => res.json(author))
//     .catch(err =>
//       res.status(404).json({
//         noauthorfound: 'No author found with that ID'
//       })
//     );
// });

// router.post('/create', (req, res) => {
//   // Code to add new polls.
//   var authorObject = new authorModel();
//   // Calling our model function.
//   // We nee to validate our payload here.
//   authorObject.addNewAuthors(req.body, function (err, authorResponse) {
//     if (err) {
//       return res.json({
//         "responseCode": 1,
//         "responseDesc": authorResponse
//       });
//     }
//     res.json({
//       "responseCode": 0,
//       "responseDesc": "Success",
//       "data": authorResponse
//     });
//   });
// });

// router.delete('/:id', (req, res) => {
//   Author.findById(req.params.id)
//     .then(author => {
//       author.remove().then(() => res.json({
//         success: true
//       }));
//       res.json({
//         msg: `${author.name} is deleted`
//       });
//     })
//     .catch(err =>
//       res.status(404).json({
//         noauthorfound: 'No author found with that ID'
//       })
//     );
// });

// router.put('/update', (req, res) => {
//   Author.findByIdAndUpdate(req.body._id, req.body, function (err, user) {
//     if (err) throw err;

//     res.json({
//       msg: `${req.body.name} is updated`
//     });
//   })

// });

// module.exports = router;


var express = require('express');
var router = express.Router();
// require model file.
var authorModel = require('../models/authors');

router.route('/')
  .get(function (req, res) {
    // Code to fetch the polls.
    var authorObject = new authorModel();
    // Calling our model function.
    authorObject.getAllAuthors(function (err, authorResponse) {
      if (err) {
        return res.json({
          "responseCode": 1,
          "responseDesc": authorResponse
        });
      }
      res.json({
        "responseCode": 0,
        "responseDesc": "Success",
        "data": authorResponse
      });
    });
  })
  .post(function (req, res) {
    // Code to add new polls.
    var authorObject = new authorModel();
    // Calling our model function.
    // We nee to validate our payload here.
    authorObject.addNewAuthors(req.body, function (err, authorResponse) {
      if (err) {
        return res.json({
          "responseCode": 1,
          "responseDesc": authorResponse
        });
      }
      res.json({
        "responseCode": 0,
        "responseDesc": "Success",
        "data": authorResponse
      });
    });
  })
  .put(function (req, res) {
    // Code to update votes of poll.
    var authorObject = new authorModel();
    // Calling our model function.
    // We need to validate our payload here.
    authorObject.votePollOption(req.body, function (err, authorResponse) {
      if (err) {
        return res.json({
          "responseCode": 1,
          "responseDesc": authorResponse
        });
      }
      res.json({
        "responseCode": 0,
        "responseDesc": "Success",
        "data": authorResponse
      });
    });
  });

module.exports = router;
