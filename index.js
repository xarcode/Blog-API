//jshint esversion:6

const express = require("express");

const app = express();
app.use(express.json());

posts = [];
authors = [];

let post_id = 2;
let author_id = 2;

author = {
    id: 1,
    name: "ayush",
    email: "ayush@gmail.com"
}
post = {
    id: 1,
    title: "",
    content: "abracadabra",
    publication_date: "",
    author: author
};

posts.push(post);
authors.push(author);

// OK
app.get("/posts", function(req, res){  
  return res.json(posts);
});

// OK
app.get("/posts/:id", function(req, res){
    const id = req.params.id;
    let post = posts.find(post => post.id == id);
    if(!post) return res.status(404).json({message: "post not found"});
    return res.json(post);
});

// OK
app.get("/authors/all/:id", function(req, res){
    const id = req.params.id;
    let author = authors.find(author => author.id == id);
    if(!author) return res.status(404).json({message: "author not found"});
    let author_posts = posts.filter(post => post.author.id == id);
    return res.json(author_posts);
});

// OK
app.get("/authors", function(req, res){
    return res.json(authors);
});

// OK
app.post("/compose", (req, res) => {
    const author_id = req.get("author_id");
    const _author = authors.find(author => author.id == author_id);

    if(!_author) return res.status(404).json({message: "author not found"});
    const new_post = {
        id: post_id++,
        title: req.body.title,
        content: req.body.content,
        publication_date: new Date().toISOString().substring(0, 10),
        author: _author
    };
    // console.log(new_post);
    posts.push(new_post);
    return res.json({message: "post created successfully", author: req.get("author_id")});
});

// OK
app.post("/register", (req, res) => {
    const exists = authors.find(author => author.email == req.body.email);
    if(exists) return res.status(400).json({message: "author already exists"});
    const new_author = {
        id: author_id++,
        name: req.body.name,
        email: req.body.email
    };
    authors.push(new_author);
    return res.json({message: "author registered successfully", author: new_author});
});

// OK
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const author_id = req.get("author_id");
    const _author = authors.find(author => author.id == author_id);
    if(!_author) return res.status(404).json({message: "author not found"});
    const post = posts.find(post => post.id == id);
    if(!post) return res.status(404).json({message: "post not found"});
    if(post.author.id != author_id) return res.status(403).json({message: "unauthorized"});
    posts = posts.filter(post => post.id != id);
    return res.json({message: "post deleted successfully"});
});

// OK
app.delete("/authors/:id", (req, res) => {
    const id = req.params.id;
    const author = authors.find(author => author.id == id);
    if(!author) return res.status(404).json({message: "author not found"});
    authors = authors.filter(author => author.id != id);
    posts = posts.filter(post => post.author.id != id);
    return res.json({message: "author deleted successfully"});

});

// OK
app.patch("/posts/:id", (req, res) => {
    const id = req.params.id;
    const author_id = req.get("author_id");
    const _author = authors.find(author => author.id == author_id);
    if(!_author) return res.status(404).json({message: "author not found"});
    const post = posts.find(post => post.id == id);
    if(!post) return res.status(404).json({message: "post not found"});
    if(post.author.id != author_id) return res.status(403).json({message: "unauthorized"});
    post.title = req.body.title;
    post.content = req.body.content;
    post.publication_date = new Date().toISOString().substring(0, 10);
    return res.json({message: "post updated successfully"});
});

// OK
app.patch("/authors/:id", (req, res) => {
    const id = req.params.id;
    const author = authors.find(author => author.id == id);
    if(!author) return res.status(404).json({message: "author not found"});
    author.name = req.body.name;
    return res.json({message: "author updated successfully"});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
