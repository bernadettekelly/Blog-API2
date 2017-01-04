const chai = require('chai');
const chaiHTTP = require('chai-HTTP');

const should = chai.should();

const {BlogPost} = require('../models');
const {closeServer, runServer, app} = require('../server');

chai.use(chaiHTTP);

describe('GET endpoint', function() {
	it 'should return all existing posts', function() {

	let res;
	return chai.request(app)
	.get('/posts')
	.then(_res => {
	res = _res;
	res.should.have.status(200);
	res.body.should.have.length.of.at.least(1);

	return BlogPost.count();
	})
	.then(count => {
	res.body.should.have.length.of(count);
	});

it 'should return posts with right fields', function () {
	
	let resPost;
	return chai.request(app)
	.get('/posts')
	.then(function(res) {

	res.should.have.status.(200);
	res.should.be.json;
	res.body.should.have.length.of.at.least(1);

	res.body.forEach(function(post) {
	 post.should.be.an('object');
	 post.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
	});
	//[{id: 1, title: 'asad', content: 'assad'}, {id: 2, title: 'qwe', content: 'qweer'}]
	// resPost = res.body[0];
	//       resPost.title.should.equal(post.title);
 //          resPost.content.should.equal(post.content);
 //          resPost.author.should.equal(post.authorName);
 //          resPost.publishDate.should.equal(post.publishDate);
 //        });

 //        });
}); 

describe('POST endpoint', function() {
	it('should add a new blog post', function() {
	return chai.request(app)
        .post('/posts')
        .send(newPost)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'title', 'content', 'author', 'publishDate');
          res.body.title.should.equal(newPost.title);
          res.body.id.should.not.be.null;
          res.body.author.should.equal(
            `${newPost.author.firstName} ${newPost.author.lastName}`);
          res.body.content.should.equal(`$newPost.content}`);
          res.body.publishDate.should.equal(`${newPost.publishDate}`);
          res.body.title.should.equal(`${newPost.title}`)
         
	});
});

describe('PUT endpoint', function() {
	it('should update entered blog post fields', function() {
      const updateData = {
        title: 'How To',
        content: 'xxxxxxx',
        author: {
          firstName: 'John',
          lastName: 'Smith',
        publishDate: '12/29/16'
        }
      };

      // return BlogPosts
      //   .findOne()
      //   .exec()
      //   .then(post => {
      //     updateData.id = post.id;

          return chai.request(app)
            .put(`/posts/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.title.should.equal(updateData.title);
          res.body.publishDate.should.equal(updateData.publishDate);
          res.body.author.should.equal(
            `${updateData.author.firstName} ${updateData.author.lastName}`);
          res.body.content.should.equal(updateData.content);

          // return BlogPost.findById(res.body.id).exec();
        })
        .then(post => {
          post.title.should.equal(updateData.title);
          post.content.should.equal(updateData.content);
          post.publishDate.shrould.equal(updateData.publishDate);
          post.author.firstName.should.equal(updateData.author.firstName);
          post.author.lastName.should.equal(updateData.author.lastName);
        });
	});
});


  describe('DELETE endpoint', function() {
  it('should delete a post by id', function() {
  return BlogPost
      .delete(`/posts:id/`)
      .then(res => {
          res.should.have.status(204);
          return BlogPost.findById(post.id);
        })
        .then(_post => {
         should.not.exist(_post);
         // let post;
        // .findOne()
        // .exec()
        // .then(_post => {
        //   post = _post;
        // return chai.request(app).delete(`/posts/${post.id}`);
         
        });
    });
  });