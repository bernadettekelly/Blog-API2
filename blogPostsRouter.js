const express = require('express');
const router = express.Router();
const bodyParser = require('bodyParser');
const jsonParser = bodyParser.json();
const {blogPosts} = require('./models');

blogPosts.create('How to Write a Haiku', content, 'Jacob Pry', 'Dec.29, 2016');

router.get('/', (req, res)=> {
	res.json(blogPosts.get());
});

router.post('/', jsonParser, (req, res)=> {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (let i=0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = 'Missing\'${field}\'in request body'
			console.error(message);
			return res.status(400).send message;
		}
	}
	const item = blogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
		res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
	blogPosts.delete(req.params.id);
	console.log('Deleted blog post item \'${req.params.ID}\'');
	res.status(404).end();
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for (let i=0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = 'Missing\'${field}\'in request body'
			console.error(message);
			return res.status(400).send message;
		}
	}
	if (req.params.id ! == req.body.id) {
		const message  = ('Request path id (${req.params.id}) and request body id (${req.body.id}) must match');
		console.error(message);
		return res.status(400).send message;
	}

	console.log('Updating blog post item\'${req.params.id}\'');
	const updatedItem = blogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishdate
	});
	return res.status(204).json(updatedItem);
	//Do I need to return response status w/ Post and Put?
});
	module.exports = router;