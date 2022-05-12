const request = require('supertest');
const { User } = require('../database/models');
const app = require('../server');
let token = null;
const loginUser = 'admin_1';
const createUser = 'escobar';
const totalUser = 3; // according to seeder

describe('Post Endpoints', () => {

  it('should successfully login', async () => {
    const res = await request(app)
        .post('/api/login')
        .send({
          username: loginUser
        });
        
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    token = res.body.accessToken;
  });

  it('should fetch all users', async () => {
    const res = await request(app)
        .get('/api/user')
        .set('x-access-token', token)
    expect(res.statusCode). toEqual(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.users).toHaveLength(totalUser);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user')
      .set('x-access-token', token)
      .send({
        username: createUser,
        role_id: 1
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    const { user } = res.body;
    
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('role_id');
    expect(user.username).toEqual(createUser);
    expect(user.role_id).toEqual(1);

    const countUser = await User.count();
    expect(countUser).toBeGreaterThan(totalUser)
  });
});
