const express = require("express");
const db = require("./config/db");
const app = express();
const Post = require("./models/Post");
const port = process.env.PORT || 3000;

app.use(express.json());

db()
  .then(() => console.log("successfully connected to db"))
  .catch((err) => console.log(err));

app.get("/api/", (req, res) => {
  res.status(200).json({ message: "api is working fine" });
});
// fetching all the posts
app.get("/api/posts", (req, res) => {
  Post.find({})
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});
// get a specific post
app.get("/api/posts/:id", (req, res) => {
  let postid = req.params.id;
  Post.find({ _id: postid })
    .then((data) => {
      console.log(data);
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});
// create a new post
app.post("/api/posts/", (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  newPost
    .save()
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: "post created successfully", data: data });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});
// updating a specific post
app.put("/api/posts/:id", (req, res) => {
  let postid = req.params.id;
  let newInfo = {
    title: req.body.title,
    description: req.body.description,
  };
  Post.findByIdAndUpdate(postid, newInfo)
    .then((data) => {
      res.status(200).json({ message: "post created successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
// deleting a specific post
app.delete("/api/posts/:id", (req, res) => {
    let postid = req.params.id;
    Post.findByIdAndDelete(postid).then(()=>{
        res.status(200).json({ message: "post deleted successfully"} )
    }).catch((err) => {
        res.status(500).json({ message: err });
    });
});

app.listen(port, (err) => {
  if (!err) {
    console.log("server is up and running on port:", port);
  }
});
