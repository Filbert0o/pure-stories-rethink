const express = require('express');

// create Route instance for Authors
const router = express.Router();

// Load Author model

import authorModel from '../models/authors';

router.get('/test', (req, res) => res.json({ msg: 'Author Works!' }));

router.get('/', (req, res) => {
  // Code to fetch the authors.
  var authorObject = new authorModel();
  // Calling our model function.
  authorObject.getAllAuthors((err, authorResponse) => {
    if (err) {
      return res.json({
        "responseCode": 1,
        "responseDesc": authorResponse
      });
    }
    // res.json({
    //   "responseCode": 0,
    //   "responseDesc": "Success",
    //   "data": authorResponse
    // });
    res.json(authorResponse);
  });
});

router.get('/:id', (req, res) => {
  let authorObject = new authorModel();

  authorObject.getAuthor(req.params.id, (err, authorResponse) => {
    if (err) {
      res.json({
        "responseCode": 1,
        "responseDesc": authorResponse
      });
    }
    // res.json({
    //   "responseCode": 0,
    //   "responseDesc": "Success",
    //   "data": authorResponse
    // });
    res.json(authorResponse);
  })
});

router.post('/create', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  let authorObject = new authorModel();

  authorObject.deleteAuthor(req.params.id, (err, authorResponse) => {
    if (err) {
      res.json({
        "responseCode": 1,
        "responseDesc": authorResponse
      });
    }
    res.json({
      "responseCode": 0,
      "responseDesc": "Success",
      "data": authorResponse
    });
  })
});

router.put('/update', (req, res) => {
  let authorObject = new authorModel();

  authorObject.updateAuthor(req.body, (err, authorResponse) => {
    if(err) {
      res.json({
        "responseCode": 1,
        "responseDesc": authorResponse
      });
    }
    res.json({
      "responseCode": 0,
      "responseDesc": "Success",
      "data": req.body
    });
  })
});

module.exports = router;


// var express = require('express');
// var router = express.Router();
// // require model file.
// var authorModel = require('../models/authors');

// router.route('/')
//   .get(function (req, res) {
//     // Code to fetch the polls.
//     var authorObject = new authorModel();
//     // Calling our model function.
//     authorObject.getAllAuthors(function (err, authorResponse) {
//       if (err) {
//         return res.json({
//           "responseCode": 1,
//           "responseDesc": authorResponse
//         });
//       }
//       res.json({
//         "responseCode": 0,
//         "responseDesc": "Success",
//         "data": authorResponse
//       });
//     });
//   })
//   .post(function (req, res) {
//     // Code to add new polls.
//     var authorObject = new authorModel();
//     // Calling our model function.
//     // We nee to validate our payload here.
//     authorObject.addNewAuthors(req.body, function (err, authorResponse) {
//       if (err) {
//         return res.json({
//           "responseCode": 1,
//           "responseDesc": authorResponse
//         });
//       }
//       res.json({
//         "responseCode": 0,
//         "responseDesc": "Success",
//         "data": authorResponse
//       });
//     });
//   })
//   .put(function (req, res) {
//     // Code to update votes of poll.
//     var authorObject = new authorModel();
//     // Calling our model function.
//     // We need to validate our payload here.
//     authorObject.votePollOption(req.body, function (err, authorResponse) {
//       if (err) {
//         return res.json({
//           "responseCode": 1,
//           "responseDesc": authorResponse
//         });
//       }
//       res.json({
//         "responseCode": 0,
//         "responseDesc": "Success",
//         "data": authorResponse
//       });
//     });
//   });

// module.exports = router;
