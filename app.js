const express       = require("express");
const app           = express();
const mongoose      = require("mongoose");
const bodyParser    = require("body-parser");
const expressSanitizer  = require("express-sanitizer");
const methodOverride  = require('method-override');

//mongoose.connect("mongodb://localhost:27017/shopping-app", {useMongoClient:true});
let url = process.env.DATABASEURL || "mongodb://localhost:27017/shopping-app";
mongoose.connect(url, {useMongoClient:true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

let todoSchema = new mongoose.Schema({
  text: String,
});

let Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) =>{
  res.redirect("/todos");
});

app.get("/todos", (req, res) =>{
  Todo.find({}, (err, todos) =>{
    if(err){
      console.log(err);
    } else {
      if(req.xhr) {
        res.json(todos);
      } else {
        res.render("index", {todos: todos}); 
      }
    }
  });
});

app.get("/todos/new", (req, res) =>{
 res.render("new"); 
});

app.post("/todos", (req, res) =>{
 req.body.todo.text = req.sanitize(req.body.todo.text);
 let formData = req.body.todo;
 Todo.create(formData, (err, newTodo) =>{
    if(err){
      res.render("new");
    } else {
      res.json(newTodo);
    }
  });
});

app.get("/todos/:id/edit", (req, res) =>{
 Todo.findById(req.params.id, (err, todo) =>{
   if(err){
     console.log(err);
     res.redirect("/")
   } else {
      res.render("edit", {todo: todo});
   }
 });
});

app.put("/todos/:id", (req, res) =>{
 Todo.findByIdAndUpdate(req.params.id, req.body.todo, { new: true }, (err, todo) =>{
   if(err){
     console.log(err);
   } else {
      res.json(todo);
   }
 });
});

app.delete("/todos/:id", (req, res) =>{
 Todo.findByIdAndRemove(req.params.id, (err, todo) =>{
   if(err){
     console.log(err);
   } else {
      res.json(todo);
   }
 }); 
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running shopping app on port 3000 " + process.env.PORT);
});

/*app.listen(3000, () =>{
  console.log('Server running shopping app on port 3000');
});*/