import { Order, OrderList } from '../models/orders';
import { Product, ProductList } from '../models/products';
import { User, UserList } from '../models/users';


const list = new OrderList()
const product = new ProductList()
const user = new UserList()


describe("product Model", async () => {

    afterEach(() => {

    });
    it('should have an index method', () => {
        expect(list.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });

    it('check create and index method', async () => {
        // @ts-ignore
        const resultp = await product.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        // @ts-ignore
        const resultu = await user.create({
            firstName: 'chris',
            lastName: 'cho',
            password: '1234',
        });
        // @ts-ignore
        const result = await list.create({
            product_id: resultp.id as unknown as number,
            quantity: 100,
            user_id: resultu.id as unknown as number,
            status: 'active',
        });

        const new_id = result.id
        // @ts-ignore
        expect(result).toEqual({
            id: new_id,
            // @ts-ignore
            product_id: resultp.id.toString(),
            quantity: 100,
            // @ts-ignore
            user_id: resultu.id.toString() ,
            status: 'active',
        });
        // @ts-ignore
        const result_1 = await list.index(resultu.id.toString())

        expect(result_1.length).toBeGreaterThan(0);

    });


   
});