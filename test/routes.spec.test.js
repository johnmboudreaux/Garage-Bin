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
    it("should add new owner to owners", (done) => {
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

  describe('GET /api/v1/items/:id', () => {
    it('should return a specific item', (done) => {
      chai.request(server)
        .get('/api/v1/owners/1/homes')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].id.should.equal(1);
          response.body[0].houseName.should.equal('Cloud House');
          response.body[0].description.should.equal('Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.');
          response.body[0].houseAddress.should.equal('2104 Westfall Avenue');
          response.body[0].bathrooms.should.equal(5);
          response.body[0].bedrooms.should.equal(5);
          response.body[0].zipCode.should.equal(80221);
          response.body[0].ownerId.should.equal(1);
          done();
        })
        .catch((error) => {
          throw error;
        });
    });
  });


});
