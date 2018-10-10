module.exports = (User, core)=>{
      let cf  = core;
      let app  = core.app;
      let express  = core.express;

      app.use(cf.bodyParser.urlencoded({ extended: true }))
      app.use(cf.bodyParser.json())
      app.set('view engine', 'ejs');
      let is_LoggedIn = cf.is_LoggedIn;
      let redirect_to_login = cf.redirect_to_login;
      let json_Result = cf.json_Result;
  var session  = require('express-session');
  app.use(session({secret:"f254fr45t43ty5409143t91y4ty920ty123", resave:false, saveUninitialized:true}))
  function isLoggedIn(req, User) {
    if (req.session.user) {
      User.findOne({
        username:req.session.user,
      }, function(err,user){
        if (err) {console.log(err);
return false;
        } else {
          user = req.session.user
          return user;
        }
      })
    }
  }
  app.get('/register', function(req, res){
    data = {}
    data.siteurl = 'localhost:27'
        return res.status(200).render('register.ejs', {
          data
        });
  })
  app.post('/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var newuser = new User();
        newuser.username = username;
        newuser.password = password;
        User.findOne({
          username:username,
          password:password,
        }, function(err,user){
        if (!user) {
          newuser.save(function(err, savedUser){ if (err) {  console.log(err);  } })
              return res.status(200).send(json_Result('Поздравляем с успешной регистрацией, ' + username + '!'))
        }
        res.status(200).send(json_Result('Имя ' + username + ' уже занято!'));
        })
  });
  app.get('/login', function(req, res){
        return res.status(200).render('login.ejs', {
        user: req.session.user
      });
  })
  app.get('/profile', function(req, res){
      if (!is_LoggedIn(req)) { return redirect_to_login(res) }
        return res.status(200).render('dashboardUser.ejs', {
        user: req.session.user,
        dash_sub: 'profile',
      });
  })
//   app.get('/objects', function(req, res){
// const Note = require('../db/models/note.model.js');
// Note.find()
// .then(notes => {
//   return res.status(200).render('dashboardUser.ejs', {
//   user: req.session.user,
//   schema: Note.schema,
//   dash_sub: 'objects',
//           content: notes
// });
// }).catch(err => {
//     res.status(500).send({
//         message: err.message || "Some error occurred while retrieving notes."
//     });
//   })
// });
//
app.post('/login', function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      User.findOne({
        username:username,
        password:password,
      }, function(err,user){
            if (err) {
              let json_result = json_Result('Произошла ошибка')
              return res.status(500).send(json_result)
             }
            if (!user) {
              let json_result = json_Result('Не существует пользователя с именем ' + username + '!')
              return res.status(404).send(json_result);
              }
            req.session.user =  user;
            let json_result = json_Result('Добро пожаловать ' + username + '!')
            return res.status(200).send(json_result);
            })})
app.post('/logout', function(req, res) {
      req.session.destroy()
      res.status(200).send()
})
app.get('/logout', function(req, res) {
        user = req.session.user;
      req.session.destroy()
  return res.status(200).render('logout.ejs', { user : user, });
})
app.get('/dashboard', function(req, res){
      if (!req.session.user) {
      return res.status(301).redirect('/login');
    } else {
      user = req.session.user;
    }
      app.use(express.static('views'));
      if (user.isSU)
      return res.status(200).render('dashboard.ejs', { user : user, profile_page: false});
      // if (user.user_role == 'Admin')
      //  return res.status(200).render('dashboardAdmin.ejs', { user : user, profile_page: false });
      // return res.status(200).render('dashboardUser.ejs', { user : user, profile_page: false });
      // if (user.user_role == 'User' || user.user_role == 'Пользователь')
      return res.status(200).render('dashboardUser.ejs', { user : user,   dash_sub: 'content'});
})
//LOGIN-REGISTER
app.get('/edit_quests', function(req, res){
    if (!is_LoggedIn(req)) { return redirect_to_login(res) }
const Quest = require('../db/models/quest.model.js');
Quest.find()
.then(quests => {
return res.status(200).render('dashboardUser.ejs', {
user: req.session.user,
schema: Quest.schema,
dash_sub: 'quests',
model_label: 'Квесты',
        content: quests
});
}).catch(err => {
  res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
  });
})
});
app.get('/edit_reviews', function(req, res){
    if (!is_LoggedIn(req)) { return redirect_to_login(res) }
const Review = require('../db/models/reviews.model.js');
Review.find()
.then(reviews => {
return res.status(200).render('dashboardUser.ejs', {
user: req.session.user,
schema: Review.schema,
dash_sub: 'objects',
        content: reviews
});
}).catch(err => {
  res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
  });
})
});
app.get('/edit_pages', function(req, res){
    if (!is_LoggedIn(req)) { return redirect_to_login(res) }
const Page = require('../db/models/page.model.js');
Page.find()
.then(pages => {
return res.status(200).render('dashboardUser.ejs', {
user: req.session.user,
schema: Page.schema,
dash_sub: 'objects',
        content: pages
});
}).catch(err => {
  res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
  });
})
});




};
