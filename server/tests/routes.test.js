const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const server = 'http://localhost:5000'
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Routes test", () => {
  describe('GET /accounts', () => {
    it ('should return 200 and all accounts ', (done) => {
      chai.request(server)
        .get('/api/accounts')
        .end((err, res) => {
          if (err) return done(err);  
          res.should.have.status(200);      
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.accounts).to.be.an.instanceof(Array);
          expect(res.body.accounts).to.have.lengthOf.above(0);
          expect(res.body.accounts[0]).to.have.property('id');
          expect(res.body.accounts[0]).to.have.property('accountName');
          expect(res.body.accounts[0]).to.have.property('accountNumber');
          expect(res.body.accounts[0]).to.have.property('ccy');
          expect(res.body.accounts[0]).to.have.property('amount');
          expect(res.body.accounts[0]).to.have.property('createdAt');
          expect(res.body.accounts[0]).to.have.property('updatedAt');
          done();
        });
    });
  });

  describe('GET /transactions', () => {
    it ('should return 200 and accounts transactions ', (done) => {
      chai.request(server)
        .get('/api/transactions/6d829248-e55d-48ac-8be5-73599fe36a2a')
        .end((err, res) => {
          if (err) return done(err);  
          res.should.have.status(200);      
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.transactions).to.be.an.instanceof(Array);
          expect(res.body.transactions).to.have.lengthOf.above(0);
          expect(res.body.transactions[0]).to.have.property('id');
          expect(res.body.transactions[0]).to.have.property('accountId');
          expect(res.body.transactions[0]).to.have.property('description');
          expect(res.body.transactions[0]).to.have.property('action');
          expect(res.body.transactions[0]).to.have.property('rate');
          expect(res.body.transactions[0]).to.have.property('ccy');
          expect(res.body.transactions[0]).to.have.property('amount');
          expect(res.body.transactions[0]).to.have.property('ccyInForeign');
          expect(res.body.transactions[0]).to.have.property('amountInForeign');
          expect(res.body.transactions[0]).to.have.property('createdAt');
          expect(res.body.transactions[0]).to.have.property('updatedAt');          
          done();
        });
    });
  });
});