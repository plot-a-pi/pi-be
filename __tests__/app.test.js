require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const GlobalData = require('../lib/models/GlobalData');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('get sesssion data by id', async() => {
    const sessionData = [
      { circumference: 10, diameter: 5, sessionId: 'session1', diameterUnit:'in', circumferenceUnit: 'in' },
      { circumference: 5, diameter: 2.5, sessionId: 'session1', diameterUnit:'in', circumferenceUnit: 'in' },
      { circumference: 2.5, diameter: 1, sessionId: 'session1', diameterUnit:'in', circumferenceUnit: 'in' },
      { circumference: 15, diameter: 7.5, sessionId: 'session1', diameterUnit:'in', circumferenceUnit: 'in' }
    ];
    await GlobalData.create(sessionData);

    return request(app)
      .get('/session-data/session1')
      .then(res => {

        res.body.forEach(item => {
          expect(res.body).toContain(item);
        });
      });
  });
});
