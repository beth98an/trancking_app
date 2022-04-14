describe ('user endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return all users', async() =>{
        const res = await request(api).get('/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(2)
        expect(res.body[0]).toHaveProperty('user_id')
    })

    it('should return user by username', async() => {
        const res = await request(api).get('/users/user1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.user_id).toEqual(1)
    })

    it('should return user not found by username', async() => {
        const res = await request(api).get('/users/user4')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('err')
    })

    it('should create a new user', async() => {
        const res = await request(api).post('/users/register/')
        .send({
            username: 'newUser',
            password: 'newpass',
            email: 'newuser@email.com' 
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body.user).toHaveProperty('user_id')

        const userres = await request(api).get('/users')
        expect(userres.body.length).toEqual(3)
    })

    it('should not create a new user if username exceeds 30 characters', async() => {
        const res = await request(api).post('/users/register/')
        .send({
            username: 'newUserIsToBeCreatedWhenItIsRegistered',
            password: 'newpass',
            email: 'newuser@email.com'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('err')
    })

    it('should login a user', async()=>{
        const res = await request(api).post('/users/login/')
        .send({
            username: 'user2',
            password: 'password2'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.username).toEqual('user2')
    })
    it('should not login a user if username does not exist', async()=>{
        const res = await request(api).post('/users/login/')
        .send({
            username: 'user3',
            password: 'password3'
        })
        expect(res.statusCode).toEqual(401)
        expect(res.body.err).toEqual('Username or Password incorrect!')
    })
    it('should not login a user if password is incorrect', async()=>{
        const res = await request(api).post('/users/login/')
        .send({
            username: 'user2',
            password: 'password3'
        })
        expect(res.statusCode).toEqual(401)
        expect(res.body.err).toEqual('Username or Password incorrect!')
    })

    it('should delete a user', async()=>{
        const res = await request(api).delete('/users/user1')
        expect(res.statusCode).toEqual(204)

        const userres = await request(api).get('/users/user1')
        expect(userres.statusCode).toEqual(404)
    })

    it('should return could not delete user', async()=>{
        const res = await request(api).delete('/users/user5')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('err')
    })
})
