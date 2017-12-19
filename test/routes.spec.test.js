/*eslint-disable */
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('Client Routes', () => {
  it('should return homepage', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.includes('Palette Picker');
      })
      .catch(error => {
        throw error;
      });
  });

  it('should return a 404 if the route does not exsit', () => {
    chai.request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  //happy
  describe('GET /api/v1/items', () => {
    it("should return all items in the garage", (done) => {
      chai.request(server)
        .get('/api/v1/items')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('itemName');
          response.body[0].should.have.property('itemReason');
          response.body[0].should.have.property('itemCleanliness');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  //happy
  describe('POST /api/v1/items', () => {
    it("should add new item to items", (done) => {
      chai.request(server)
        .post('/api/v1/items')
        .send({
          id: 8,
          itemName: 'the floor',
          itemReason: 'because',
          itemCleanliness: 'rancid',
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(8);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('itemName');
          response.body[0].should.have.property('itemReason');
          response.body[0].should.have.property('itemCleanliness');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  //sad
  describe('POST /api/v1/items', () => {
    it("should add new item", (done) => {
      chai.request(server)
        .post('/api/v1/items')
        .send({
          id: 1,
          itemReason: 'because',
          itemCleanliness: 'rancid'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('you are missing the itemName property');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  //happy
  describe('GET /api/v1/items/:id', () => {
    it('should return a specific item', (done) => {
      chai.request(server)
        .get('/api/v1/items/1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].id.should.equal(1);
          response.body[0].itemName.should.equal('shays bicycle');
          response.body[0].itemReason.should.equal('who knows');
          response.body[0].itemCleanliness.should.equal('dusty');
          done();
        })
        .catch((error) => {
          throw error;
        });
    });
  });

  //sad
  describe('GET /api/v1/items/:id', () => {
    it('should return 404 error for item that does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/items/100')
        .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Could not find item with id: 100');
          done();
        })
        .catch((error) => {
          throw error;
        });
    });
  });


});
