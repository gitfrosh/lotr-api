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
});