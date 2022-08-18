import { Product, ProductList } from '../models/products';

const list = new ProductList()



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

    it('should have a update method', () => {
        expect(list.delete).toBeDefined();
    });


    it('create method should add a product', async () => {
        // @ts-ignore
        const result = await list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });

        const new_id = result.id
        expect(result).toEqual({
            id: new_id,
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });

        await list.delete(new_id.toString());
    });

    it('index method should return a list of products', async () => {
        // @ts-ignore
        const result_1 = await list.create({
            
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result_1.id


        const result = await list.index();
        // @ts-ignore
        expect(result.length).toBeGreaterThanOrEqual(1)

        await list.delete(new_id.toString());

    });

    it('show method should return the correct product', async () => {
        // @ts-ignore
        const result_1 = await list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result_1.id

        const result = await list.show(new_id.toString());
        expect(result).toEqual({
            id: new_id,
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });

        await list.delete(new_id.toString());
    });

    it('delete method should remove the product', async () => {
        // @ts-ignore
        const result_1 = await list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result_1.id
        await list.delete(new_id.toString());
        const result = await list.show(new_id.toString())

        expect(result).toBeFalsy();
    });
});