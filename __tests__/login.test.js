// const {login} = require('../controllers/auth');
// const jwt = require('jsonwebtoken');
// require("dotenv").config();
// const { HttpError, ctrlWrapper } = require('../helpers');


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