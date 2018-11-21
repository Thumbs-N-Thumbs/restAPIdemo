"use strict"

const express = require('express');
const router = express.Router();
const Question = require('./models').Question;

router.param('qid', function(req, res, next, id){
  Question.findById(id, function(err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
    };
    req.question = doc;
    return next();
  });
});

router.param('aid', function(req, res, next, id){
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error('Not Found');
    err.status = 404;
    return next(err);
  };
  next();
});

// GET /questions
router.get("/", function(req, res, next){
  Question.find({})
    .sort({createdAt: -1})
    .exec(function(err, questions){
      if (err) return next(err);
      res.json(questions);
    });
});

// POST /questions
router.post("/", function(req, res, next){
  const question = new Question(req.body);
  question.save(function(err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/:id
router.get("/:qid", function(req, res, next){
  res.json(req.question);
});

// POST /questions/:id/answers
router.post("/:qid/answers", function(req, res, next){
  req.question.answers.push(req.body);
  req.question.save(function(err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:id/answers/:id
router.put("/:qid/answers/:aid", function(req, res){
  req.answer.update(req.body, function(err, result){
    if (err) return next(err);
    res.json(result);
  });
});

// DELETE /questions/:id/answers/:id
router.delete("/:qid/answers/:aid", function(req, res){
  req.answer.remove(function(err){
    req.question.save(function(err, question) {
      if (err) return next(err);
      res.json(question);
    });
  });
});

// POST /questions/:id/answers/:id/:up
// POST /questions/:id/answers/:id/:down
router.post("/:qid/answers/:aid/:vote",
  function(req, res, next){
    if (req.params.vote.search(/^(up|down)$/) === -1) {
      const err = new Error("Invalid Vote String (Must be 'up' or 'down')");
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  function(req, res){
    req.answer.vote(req.vote, function(err, question) {
      if (err) return next(err);
      res.json(question);
    });
});

module.exports = router;
