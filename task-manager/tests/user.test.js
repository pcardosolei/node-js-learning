const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase} = require('./db')


beforeEach(setupDatabase)


test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Paulo',
        email: 'pcardoso.lei@gmail.com',
        password: '1234567890'
    }).expect(201)

    // Assert database was changed properly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Paulo',
            email: 'pcardoso.lei@gmail.com'
        },
    })
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'P',
        password: userOne.password
    }).expect(400)
})


test('Should get profile for user', async () => {
    await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should delete account for unauthenticated user', async () => {
    await request(app).delete('/users/me').send().expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

        const user = await User.findById(userOneId)
        expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Augusto'
        }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Augusto')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Paços'
        }).expect(400)

})