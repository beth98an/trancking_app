describe ('habit endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5500, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should return all habits', async() =>{
        const res = await request(api).get('/habits')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(4)
        expect(res.body[0]).toHaveProperty('habit_id')
    })

    it('should return habit by id', async() => {
        const res = await request(api).get('/habits/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.habit_id).toEqual(1)
    })

    it('should return habit not found by id', async() => {
        const res = await request(api).get('/habits/7')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('err')
    })
    it('should return habit found by user', async() => {
        const res = await request(api).get('/habits/find/user1')
        expect(res.statusCode).toEqual(200)
    })
    it('should create a new habit', async() => {
        const res = await request(api).post('/habits/user1')
        .send({
            user_id: 2,
            name: 'newHabit',
            description: 'newHabit description',
            frequency: 4,
            day_month: 'newHabit frequency',
            color: 'red'
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('habit_id')

        const habitres = await request(api).get('/habits')
        expect(habitres.body.length).toEqual(5)
    })
    it('should not create a new habit if name exceeds 20 characters', async() => {
        const res = await request(api).post('/habits/user1')
        .send({
            user_id: 2,
            name: 'newHabitIsToBeCreated',
            question: 'newHabit question',
            frequency: 4,
            day_month: 'newHabit frequency',
            color: 'red'
        })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('err')
    })

    it('should delete a habit', async()=>{
        const res = await request(api).delete('/habits/1')
        expect(res.statusCode).toEqual(204)

        const habitres = await request(api).get('/habits/1')
        expect(habitres.statusCode).toEqual(404)
    })

    it('should return could not delete habit', async()=>{
        const res = await request(api).delete('/habits/5')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('err')
    })

    it('should create a new completed habit', async() => {
        const res = await request(api).put('/habits/count/1')
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual('Habit updated.')
    })
    
    it('should return habit count found by habit_id', async() => {
        const res = await request(api).get('/habits/getcount/1')
        expect(res.statusCode).toEqual(200)
    })
})
