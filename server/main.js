var Sequelize = require('sequelize');
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios');

const dotenv = require('dotenv').config({ path: '.env' })


const port = dotenv.parsed.port
var sequelize = new Sequelize(dotenv.parsed.db_name, 'postgres', dotenv.parsed.db_password, {
  dialect: 'postgres',
})


app.use(cors())
app.use(express.json())

var searchGithub = sequelize.define('searchGithub', {


          login: Sequelize.STRING,
          node_id: Sequelize.STRING,
          avatar_url: Sequelize.STRING,
          gravatar_id: Sequelize.STRING,
          url: Sequelize.STRING,
          html_url: Sequelize.STRING,
          followers_url: Sequelize.STRING,
          following_url: Sequelize.STRING,
          gists_url: Sequelize.STRING,
          starred_url: Sequelize.STRING,
          subscriptions_url: Sequelize.STRING,
          organizations_url: Sequelize.STRING,
          repos_url: Sequelize.STRING,
          events_url: Sequelize.STRING,
          received_events_url: Sequelize.STRING,
          type: Sequelize.STRING,
          site_admin: Sequelize.STRING,
          name: Sequelize.STRING,
          company: Sequelize.STRING,
          blog: Sequelize.STRING,
          location: Sequelize.STRING,
          email: Sequelize.STRING,
          hireable: Sequelize.STRING,
          bio: Sequelize.STRING,
          twitter_username: Sequelize.STRING,
          public_repos: Sequelize.STRING,
          public_gists: Sequelize.STRING,
          followers: Sequelize.STRING,
          following: Sequelize.STRING,
          created_at: Sequelize.STRING,
          updated_at: Sequelize.STRING,
          searchGithub_pke: Sequelize.STRING

});



sequelize.sync().then(function() {
  return 0
}).then(function() {
  console.log("is sync")
});



 app.get('/users/:username', function (req, res) {
    //res.send('GET request to the homepage');
   // searchGithub.findAll().then(notes => res.send(notes));
   const {username} = req.params

   searchGithub.findAll({
    where: {
      login: username,
    }

    
  }).then(notes => {
    console.log(notes)

    if(notes.length < 1){
     
      axios.get(`https://api.github.com/users/${username}`)
      .then(response => {
        
        notes = response.data;    
      
        axios.post(`http://localhost:1087/users`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body:{
            id : notes.id,
            login: notes.login,
            node_id: notes.node_id,
            avatar_url: notes.avatar_url,
            gravatar_id: notes.gravatar_id,
            url: notes.url,
            html_url: notes.html_url, 
            followers_url: notes.followers_url,
            following_url: notes.following_url,
            gists_url: notes.gists_url,
            starred_url: notes.starred_url,
            subscriptions_url: notes.subscriptions_url,
            organizations_url: req.body.organizations_url,
            repos_url: notes.repos_url,
            events_url: notes.events_url,
            received_events_url: notes.received_events_url,
            type: notes.type,
            site_admin: notes.site_admin,
            name: notes.name,
            company: notes.company,
            blog: notes.blog,
            location: notes.location,
            email: notes.email,
            hireable: notes.hireable,
            bio: notes.bio,
            twitter_username: notes.twitter_username,
            public_repos: notes.public_repos,
            public_gists: notes.public_gists,
            followers: notes.followers,
            following: notes.following,
            created_at: notes.created_at,
            updated_at: notes.updated_at
          } 
          
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error);
        });

        res.send(notes)



      })
      .catch(error => {
        console.log(error);
      });
    }else{
      res.send(notes)
    }

   
  });

  });


  

app.post('/users',(req, res) => {
    //console.log(req.body)
      searchGithub.create({
        
            id : req.body.body.id,
            login: req.body.body.login,
            node_id: req.body.body.node_id,
            avatar_url: req.body.body.avatar_url,
            gravatar_id: req.body.body.gravatar_id,
            url: req.body.body.url,
            html_url: req.body.body.html_url, 
            followers_url: req.body.body.followers_url,
            following_url: req.body.body.following_url,
            gists_url: req.body.body.gists_url,
            starred_url: req.body.body.starred_url,
            subscriptions_url: req.body.body.subscriptions_url,
            organizations_url: req.body.body.organizations_url,
            repos_url: req.body.body.repos_url,
            events_url: req.body.body.events_url,
            received_events_url: req.body.body.received_events_url,
            type: req.body.body.type,
            site_admin: req.body.body.site_admin,
            name: req.body.body.name,
            company: req.body.body.company,
            blog: req.body.body.blog,
            location: req.body.body.location,
            email: req.body.body.email,
            hireable: req.body.body.hireable,
            bio: req.body.body.bio,
            twitter_username: req.body.body.twitter_username,
            public_repos: req.body.body.public_repos,
            public_gists: req.body.body.public_gists,
            followers: req.body.body.followers,
            following: req.body.body.following,
            created_at: req.body.body.created_at,
            updated_at: req.body.body.updated_at
      }).then( (rest) => {
        res.send("donnée correctement ajouté")
      })
      .catch((err) => { console.log(err); throw err })
      .finally(() => {
          
       
      });
  
  
  });


  app.listen(port, () => {
    console.log('Server app listening on port ' + port);
  });
  