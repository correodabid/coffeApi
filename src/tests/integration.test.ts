import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import key from '../key';
import { isArray } from 'util';

chai.use(chaiHttp);
const url = 'http://localhost:8006';

const adminToken = jwt.sign(
  {
    username: 'juan',
    role: 'admin',
  },
  key.tokenKey,
  { expiresIn: 24 * 60 * 60 },
);

const customerToken = jwt.sign(
  {
    username: 'pedro',
    role: 'customer',
  },
  key.tokenKey,
  { expiresIn: 24 * 60 * 60 },
);

describe('Admin access to all apis', () => {
  it('should return all the users', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/users')
      .set('Authorization', adminToken);
    expect(isArray(res.body)).to.be.equal(true);
    expect(res).to.have.status(200);
  });

  it('should create a customer', async () => {
    const res = await chai
      .request(url)
      .post('/api/v1/users')
      .set('Authorization', adminToken)
      .send({ username: 'customer1', password: 'fake', role: 'customer' });
    expect(res).to.have.status(200);
  });

  it('should find an user by name', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/users/name/customer1')
      .set('Authorization', adminToken);
    expect(res).to.have.status(200);
  });

  it('should delete a customer', async () => {
    const res = await chai
      .request(url)
      .delete('/api/v1/users/name/customer1')
      .set('Authorization', adminToken);
    expect(res).to.have.status(200);
  });

  it('should return all the orders', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/orders')
      .set('Authorization', adminToken);
    expect(isArray(res.body)).to.be.equal(true);
    expect(res).to.have.status(200);
  });

  it('should return all the coffees', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/coffees')
      .set('Authorization', adminToken);
    expect(isArray(res.body)).to.be.equal(true);
    expect(res).to.have.status(200);
  });

  it('should create a new coffee', async () => {
    const res = await chai
      .request(url)
      .post('/api/v1/coffees')
      .set('Authorization', adminToken)
      .send({ name: 'Ristretto', intensity: 5, price: 3, stock: 15 });
    expect(res).to.have.status(200);
  });

  it('should find a coffee by name', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/coffees/name/Ristretto')
      .set('Authorization', adminToken);
    expect(res).to.have.status(200);
  });

  it('should delete a coffee by name', async () => {
    const res = await chai
      .request(url)
      .delete('/api/v1/coffees/name/Ristretto')
      .set('Authorization', adminToken);
    expect(res).to.have.status(200);
  });
});

describe('Customer access only to see coffees and make orders', () => {
  it('should not return all the users', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/users')
      .set('Authorization', customerToken);
    expect(res.body).to.be.empty;
  });

  it('should not return all the orders', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/orders')
      .set('Authorization', customerToken);
    expect(res.body).to.be.empty;
  });

  it('should return all the coffees', async () => {
    const res = await chai
      .request(url)
      .get('/api/v1/coffees')
      .set('Authorization', customerToken);
    expect(isArray(res.body)).to.be.equal(true);
    expect(res).to.have.status(200);
  });
});
