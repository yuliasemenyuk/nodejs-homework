const request = require('supertest');
const mongoose = require('mongoose');
const {login} = require('../controllers/auth');
require("dotenv").config();
// const { HttpError, ctrlWrapper } = require('../helpers');

const app = require('../app');
const {User} = require('../models/userModel');

const {DB_TEST_HOST} = process.env;

describe('Login controller test', () => {
    let server;
    beforeAll(() => server = app.listen(8081));
    afterAll(() => server.close());

    beforeEach((done) => {
        mongoose.connect(DB_TEST_HOST).then(() => done());
    })

    afterEach((done) => {
        mongoose.connection.db.dropCollection(() => {
            mongoose.connection.close(() => done())
        })
    })

    test('Response statusCode, token, user', async () => {
        const newUser = {
            email: 'boookikikiku@mail.com',
            password: '1234567'
        }
        
        const user = await User.create(newUser);

        const loginUser = {
            email: 'boookikikiku@mail.com',
            password: '1234567'
        };

        const response = await request(app).post('/api/contacts/login').send(loginUser)
        console.log(loginUser);
        expect(response.statusCode).toBe(200);
        const {body} = response;
        expect(body.token).toBeTruthy();
        const {token} = await User.findById(user._id);
        expext(body.token).toBe(token);
    })
})

// describe('Login controller test', () => {
//     it('Is login res status code 200', async () => {
//         const user = {
//             email: 'ssdsd@mail.com',
//             password: '1234567',
//             subscription: 'pro',
//             _id: '63cgh10b4b2209c9e0b10d54d'
//         }
        
//         const payload = {
//             id: user._id,
//            }
//         const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1w"});
        
//         const mReq = {
//             headers: {
//                 'authorization': `Bearer ${token}`
//             }
//         };
//         const mRes = {};

//          await login(mReq, mRes);
        
//         expect(mReq.token).toBe(token);
//         expect(mReq.user.email).toBe(user._id);
//         expect(mReq.user.subscription).toBe(user.subscription);
//         expect(mRes.status).toBe(200);
                
//      });

    //  it('Is it returns token', () => {
    //     const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1w"});
    //     return login(req, res)
    //             .get('/api/orders')
    //             .set('Authorization', `Bearer ${token}`)
    //             .then((res) => {
    //              expect(res.statusCode).toBe(200);
    //             })
    // });

    //     it('Is it returns user object with email and subscription keys/values', () => {
    //         const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1w"});
    //         return login(req, res)
    //             .get('/api/orders')
    //             .set('Authorization', `Bearer ${token}`)
    //             .then((res) => {
    //              expect(res.statusCode).toBe(200);
    //          })
    //     });
    // }); 