process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const { reset } = require('nodemon');
const request = require('supertest');
const app = require('../app');
const db = require('../models/index');

before(async () => {
    await db.connect();
});

let userPayload = {
    name: 'anshul sharma',
    dob: '16-10-1997',
    address: 'abc street',
    state: 'maharashtra',
}

let userUpdatePayload = {
    name: 'anshul',
    dob: '16-10-1997',
    address: 'abc street',
    state: 'gujrat',
}

describe('GET /users', () => {
    it('should return with 404 when no users', async () => {
        await request(app)
            .get('/api/users')
            .expect(404)
            .then((res) => {
                expect(res.status).to.be.equal(404);
            });
    });
});

describe('POST /users', () => {
    it('should be created and return json', async () => {
        await request(app)
            .post('/api/users')
            .send(userPayload)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201).then((res) => {
                expect(res.status).to.be.equal(201);
                expect(res.type).to.be.equal('application/json');
            });
    });
});

describe('GET /users', () => {
    it('should return json if users', async () => {
        await request(app)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.type).to.be.equal('application/json');
                expect(res._body.length).to.be.greaterThan(0);
            });
    });
});

describe('GET /users/:id', () => {
    it('should return json if user found', async () => {
        await request(app)
            .get('/api/users/1')
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.type).to.be.equal('application/json');
            });
    });

    it('should return with 404 if user not found', async () => {
        await request(app)
            .get('/api/users/100')
            .expect(404)
            .then((res) => {
                expect(res.status).to.be.equal(404);
            });
    });
});

describe('PUT /users/:id', () => {
    it('should return with 404 if user not found', async () => {
        await request(app)
            .get('/api/users/100')
            .expect(404)
            .then((res) => {
                expect(res.status).to.be.equal(404);
            });
    });

    it('should update user if user found', async () => {
        await request(app)
            .put('/api/users/1')
            .send(userUpdatePayload)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.type).to.be.equal('application/json');
            });
    });
});

describe('DELETE /users/:id', () => {
    it('should return with 404 if user not found', async () => {
        await request(app)
            .get('/api/users/100')
            .expect(404)
            .then((res) => {
                expect(res.status).to.be.equal(404);
            });
    });

    it('should remove user and send json if user found', async () => {
        await request(app)
            .delete('/api/users/1')
            .send(userUpdatePayload)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.status).to.be.equal(200);
                expect(res.type).to.be.equal('application/json');
            });
    });
});