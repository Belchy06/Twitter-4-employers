const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')

router.route('/register')
  .post((req,res) => {
    const { isValid, errors} = validateRegister(req.body)

    if(!isValid) {
      return res.status(404).json(errors)
    }

    User.findOne({ email: req.body.email })
    
      .then(user => {
        if(user) {
          errors.email = 'Email is already used!'
          return res.status(404).json(errors)
        }
        User.findOne({ handle: req.body.handle })
          .then(user => {
            if(user) {
              errors.handle = "An account already exists with that handle!"
              return res.status(404).json(errors)
            }

            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.password, salt, function(err, hash) {
                const newUser = new User({
                  email: req.body.email,
                  login: req.body.login,
                  handle: req.body.handle,
                  password: hash
                })
                newUser.save()
                  .then(newUser => res.json(newUser))
                  .catch(err => console.log(err))
              })
            })
          })
      })
})

router.route('/login')
  .post((req,res) => {
    const { errors, isValid } = validateLogin(req.body)

    if(!isValid) {
      return res.status(404).json(errors)
    }

    User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if(isMatch) {
              const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h'}, function(err, token) {
                return res.json({
                  success: true,
                  token: token
                })
              })
            } else {
              errors.password = 'Username or password is incorrect!'
              return res.status(404).json(errors)
            }
          })
        } else {
          errors.email = "No user was found with email address: " + req.body.email
          return res.status(404).json(errors)
        }
      })
})

router.route('/')
  .get(passport.authenticate('jwt', { session: false }) , (req, res) => {
    res.json({
      id: req.user._id,
      email: req.user.email,
      login: req.user.login,
      followers: req.user.followers,
      following: req.user.following,
      likes: req.user.likes
    })
})

router.route('/follow')
  .post(
    passport.authenticate('jwt', { session:false }),
    (req, res) => {
      User.findOne({ _id: req.body.userId })
        .select("-password")
        .then(user => {
          User.findOneAndUpdate({
            _id: req.user.id
          }, {
            $push: { following: user }        
          }, {
            new: true
          })
          .then(xx => {
            User.findOne({ _id: req.user.id })
              .select("-password")
              .then(user => {
                User.findOneAndUpdate({ 
                  _id: req.body.userId 
                }, {
                  $push: { followers: user }
                }, {
                  new: true
                })
                .then(update => res.json({ userId: req.body.userId }))
                .catch(err => console.log(err))
              })
          })
        })
        .catch(err => console.log(err))
      })

router.route('/unfollow')
.post(
  passport.authenticate('jwt', { session:false }),
  (req, res) => {
    User.findOne({ _id: req.body.userId })
      .then(user => {
        User.findOneAndUpdate({
          _id: req.user.id
        }, {
          $pull: { following: { _id: user._id }}        
        }, {
          new: true
        })
        .then(xx => {
          User.findOne({ _id: req.user.id })
            .then(user => {
              User.findOneAndUpdate({ 
                _id: req.body.userId 
              }, {
                $pull: { followers: { _id: user._id } }
              }, {
                new: true
              })
              .then(update => res.json({ userId: req.body.userId }))
              .catch(err => console.log(err))
            })
        })
      })
      .catch(err => console.log(err))
    })

router.route('/:id')
  .get((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if(user) {
          console.log(user)
          return res.json({
            _id: user._id,
            email: user.email,
            login: user.login,
            handle: user.handle,
            followers: user.followers,
            following: user.following,
            likes: user.likes
          })
        } else {
          return res.status(404).json({ msg: 'User not found' })
        }
      })
      .catch(err => console.log(err))
  }
)

router.route('/:query')
  .post((req, res) => {
    User.find({
      $or: [
        { handle: { "$regex": req.params.query, "$options": "i" } },
        { login: { "$regex": req.params.query, "$options": "i" } },
      ]
    })
    .select("-password")
    .then(user => {
      return res.json(user)
    })
    .catch(err => console.log(err))
  }
)

module.exports = router