const router = require('express').Router()
const passport = require('passport')
const Post = require('../models/Post')
const User = require('../models/User')

router.route('/add')
  .post(passport.authenticate('jwt', { session: false }), 
    (req, res) => {
      const text = req.body.text.trim()
      const newPost = new Post({
        user: {
          id: req.user.id,
          login: req.user.login,
          handle: req.user.handle
        },
        text: text,
        likes: []
      })
      newPost.save()
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

router.route('/')
  .get((req, res) => {
    Post.find()
      .sort({ createdAt: -1 })
      .then(posts => res.json(posts))
      .catch(err => console.log(err))
})

router.route('/like')
  .post(passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findOneAndUpdate({
      _id: req.body.postId
    }, {
      $push: { likes: req.user._id }
    }, {
      new: true
    }).then(user=> {
      User.findOneAndUpdate({
        _id: req.user._id
      }, {
        $push: { likes: req.body.postId }
      }, {
        new: true
      })
      .then(post => res.json({ postId: req.body.postId, userId: req.user._id}))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })

router.route('/unlike')
  .post(passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findOneAndUpdate({
      _id: req.body.postId
    }, {
      $pull: { likes: req.user._id }
    }, {
      new: true
    }).then(user=> {
      User.findOneAndUpdate({
        _id: req.user._id
      }, {
        $pull: { likes: req.body.postId }
      }, {
        new: true
      })
      .then(post => res.json({ postId: req.body.postId, userId: req.user._id}))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })

router.route('/:userId')
  .get((req, res) => {
    Post.find({ 'user.id': req.params.userId })
      .sort({ createdAt: -1 })
      .then(posts => res.json(posts))
      .catch(err => console.log(err))
})

router.route('/:query')
  .post((req, res) => {
    Post.find({ 'text': { "$regex": req.params.query, "$options": "i" } })
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
  }
)

module.exports = router