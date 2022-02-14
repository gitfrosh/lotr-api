const { getOptions } = require('../helpers/config');

describe('get options ', () => {

    it('should return filter as an empty object if no additional params provided', async () => {
        const request = {};
        const result = await getOptions(request);
        expect(result.filter).toEqual({});
    });

    it('should append non-standard params (offset, page, limit, sort) to filter', async () => {
        const request = {
            protocol: 'http',
            hostname: 'localhost:8080',
            originalUrl: '?something=blah&hello=world',
            query: {
                page: '1',
                offset: '1',
                limit: '1',
                sort: 'name:asc'
            }
        };
        const result = await getOptions(request);
        expect(result.filter).toEqual({ something: 'blah', hello: 'world' });
    });

    it('should correctly parse ascending parameter', async () => {
        const request = { query: { sort: 'name:asc' } };
        const result = await getOptions(request);
        expect(result.sort).toEqual({ name: 1 });
    });

    it('should correctly parse descending parameter', async () => {
        const request = { query: { sort: 'name:desc' } };
        const result = await getOptions(request);
        expect(result.sort).toEqual({ name: -1 });
    });

    it('should correctly parse page parameter', async () => {
        const request = { query: { page: '1' } };
        const result = await getOptions(request);
        expect(result.page).toEqual(1);
    });

    it('should correctly parse offset parameter', async () => {
        const request = { query: { offset: '1' } };
        const result = await getOptions(request);
        expect(result.offset).toEqual(1);
    });

    it('should correctly parse limit parameter', async () => {
        const request = { query: { limit: '1' } };
        const result = await getOptions(request);
        expect(result.limit).toEqual(1);
    });

    it('should set limit to 1000 if not specified', async () => {
        const request = {};
        const result = await getOptions(request);
        expect(result.limit).toEqual(1000);
    });

    it('should correctly parse base query parameters (page, limit, sort)', async () => {
        const request = { query: { page: '1', limit: '1', sort: 'name:asc' } };
        const options = await getOptions(request);
        expect(options.filter).toEqual({});
        expect(options.sort).toEqual({ name: 1 });
        expect(options.limit).toEqual(1);
        expect(options.page).toEqual(1);
    });
});