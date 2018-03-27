
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;

//init app
const app = express();

//MongoDB
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/todo';

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

//Set View Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//MongoDB Connection
MongoClient.connect(url, (err,database) => {
    console.log("MongoDB Connected");
    if(err) return err;
    const TodosDB = database.db('todo');
    Todos=TodosDB.collection('todos');
    
    //app running
    app.listen(port,() =>{
        console.log("server is running on port "+port);
    });
});

//set Routes
app.get('/',(req,res,next)=>{
   Todos.find({}).toArray((err,todos) => {
      if(err)
       return console.log(err);
      res.render('index',{
          todos:todos
      });
   })
});

//add submitted todo to Database
app.post('/todos/add',(req,res,next) =>{
   //create todo object
   const todo ={
       text:req.body.text,
       body:req.body.body
   }
   //Insert todo object to database
   Todos.insert(todo,(err,result) => {
       if(err)
        return console.log(err);
      console.log("Todo added..");
      res.redirect('/');
   });
});

//Delete submitted todo from Database

app.delete('/todos/delete/:id',(req,res,next)=>{
   const query = {_id:ObjectID(req.params.id)}
   Todos.deleteOne(query,(err,response) => {
      if(err){
          return console.log(err);
      }
      console.log('Todo Removed');
      res.send(200); 
   });
});