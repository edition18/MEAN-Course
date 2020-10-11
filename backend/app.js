const express = require('express');

const app = express();
// big chain of middleware/funnel

app.use('/api/posts', (req, res, next) => {
  // with the '/posts' , it means only requests targeting localhost 3000/posts
  //will reach this middleware, all other requests will actually go into the void because we have no default
  //error handlier
  const posts = [
    {
    id: "DS23131D",
    title: "first serverside post",
    content: "this is coming from server" },
    {
      id: "ASXDF131D",
      title: "second serverside post",
      content: "this is coming from server!" },
  ];
  res.status(200).json({
    message: "Posts fetched succesfully",
    posts: posts
  });
});

module.exports = app;
//export the entire app module, incl the methods
