const { getOptions } = require('../helpers/config');

describe('get options ', () => {

    it('should correctly parse ascending parameter', async () => {
        const request = { query: { sort: 'asc' } };
        const result = await getOptions(request);
        expect(result.sort).toEqual({ asc: -1 });
    });

    it('should correctly parse descending parameter', async () => {
        const request = { query: { sort: 'desc' } };
        const result = await getOptions(request);
        expect(result.sort).toEqual({ desc: -1 });
    });

    // it.only('should correctly parse base query parameters (sort, page, limit, offset)', async () => {

    //     const request = { query: { page: '1', limit: '1', sort: 'asc' } };
    //     const options = await getOptions(request);
    //     expect(options.filter).toEqual({});
    //     expect(options.sort).toEqual({ asc: -1 });
    //     expect(options.limit).toEqual(1);
    //     expect(options.page).toEqual(1);
    // });
});