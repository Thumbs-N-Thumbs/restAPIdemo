"use strict"

const express = require('express');
const router = express.Router();

// GET /questions
router.get("/", function(req, res){
  res.json({response: "you sent me a GET request"})
});

// POST /questions
router.post("/", function(req, res){
  res.json({
    response: "you sent me a POST request",
    body: req.body
  })
});

// GET /questions/:id
router.get("/:qid", function(req, res){
  res.json({response: `you sent me a GET request for ${req.params.qid}`})
});

// POST /questions/:id/answers
router.post("/:qid/answers", function(req, res){
  res.json({
    response: `you sent me a POST request for ${req.params.qid}/answers`,
    body: req.body
  })
});

// PUT /questions/:id/answers/:id
router.put("/:qid/answers/:aid", function(req, res){
  res.json({
    response: `you sent me a PUT request for ${req.params.qid}/answers/${req.params.aid}`,
    body: req.body
  })
});

// DELETE /questions/:id/answers/:id
router.delete("/:qid/answers/:aid", function(req, res){
  res.json({
    response: `you sent me a DELETE request for ${req.params.qid}/answers/${req.params.aid}`
  })
});

// POST /questions/:id/answers/:id/:up
// POST /questions/:id/answers/:id/:down
router.post("/:qid/answers/:aid/:vote", function(req, res, next){
  if (req.params.vote.search(/^(up|down)$/) === -1) {
    const err = new Error("Invalid Vote String (Must be 'up' or 'down')");
    err.status = 404;
    next(err);
  } else {
    next();
  }
},
function(req, res){
  res.json({
    response: `you sent me a POST request for ${req.params.qid}/answers/${req.params.aid} with a vote of ${req.params.vote}`
})



});

module.exports = router;
