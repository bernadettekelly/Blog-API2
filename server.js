const blogPostsRouter = require('./blogPostsRouter');
const express = require('express');
const morgan = require('morgan');

app.use(morgan('common'));
app.use('./blogPostsRouter', blogPostsRouter);
app.use(express.static('public'));

app.listen(process.env.PORT || 8080, ()=>{
	console.log('Your app is listening on port ${process.env.PORT || 8080}');
}