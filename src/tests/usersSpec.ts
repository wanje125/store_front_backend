import { User, UserList } from '../models/users';

const list = new UserList()



describe("product Model", async () => {

    afterEach(() => {

    });
    it('should have an index method', () => {
        expect(list.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(list.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });

    it('should have a authenticate method', () => {
        expect(list.authenticate).toBeDefined();
    });

    it('create user and check the authenticate', async () => {
        // @ts-ignore
        const result = await list.create({
            firstName: 'chris',
            lastName: 'cho',
            password: '1234',
        });
        // @ts-ignore
        expect(result.firstname).toEqual(
            'chris'
        );
        // @ts-ignore
        expect(result.lastname).toEqual(
            'cho'
        );

        const result_1 = await list.authenticate('chris', 'cho', '1234')
        expect(result_1).toBeTruthy()

    });

});