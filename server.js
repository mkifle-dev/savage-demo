const express = require('express') 
// express =framework that allow us to build out our API's...by create we mean the create (post), read (Get), update(Put) and Delete (Delete) requests
const app = express() 
//^^
const bodyParser = require('body-parser') 
// enables us to look @ request body; body parser enables us to look at that information. Now build into express. 
const MongoClient = require('mongodb').MongoClient 
// a way to connect to our MongoDb database. 

var db, collection; 
 // database * collection; var used for gloabl scoping. 

const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true"; //conection to database 
const dbName = "demo"; // name of database. 

app.listen(3000, () => {  
    //this section is setting up server, and telling to connect to 3000
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
  // ejs looks just like html, but allows us plug content into html, without hardcoding. 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
// reads the static files 
// express handles all routing as long as in public folder. 

app.get('/', (req, res) => {  //both objects
  db.collection('messages').find().toArray((err, result) => { //whereever we see result, that is the variable holding our array that has all of the documents from the database in it. 
    // all docs were put into array that has the name of result. 
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
    // res= response ; req= request
    //render out an html response...our response is going to be result of render method
    // messages  is holding our array of data/objects. ()
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
 req.body.operation === '-' ? req.body.thumbUp-- : req.body.thumbUp++
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      
      thumbUp: req.body.thumbUp
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

