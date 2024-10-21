import {Request} from 'express';
import {MongooseQueryParser} from 'mongoose-query-parser';
import {PaginateOptions} from './interfaces';
import {IGraphQLContext, DataNames} from "../graphql/schema";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
const ascending = 'asc';
const maxLimit = 1000;

export const getOptions = async (req: Request): Promise<PaginateOptions> => {
    let options: PaginateOptions = {filter: {}};

    const sort = req?.query?.sort as string;
    const page = req?.query?.page as string;
    const limit = req?.query?.limit as string;
    const offset = req?.query?.offset as string;

    // Express does not offer a handy way to get the raw query strings
    // so let's parse it and drop the leading `?` for the parser
    const url = new URL(req.protocol + '://' + req.hostname + req.originalUrl);
    const rawQueryParams = url.search.slice(1);

    const parser = new MongooseQueryParser({
        blacklist: ['offset', 'page', 'limit', 'sort']
    });
    const parsed = parser.parse(rawQueryParams);
    options.filter = parsed.filter;

    if (sort) {
        const fields = sort.split(':');
        const sorter = fields[0];
        const direction = fields[1];
        options.sort = {[sorter]: direction === ascending ? 1 : -1};
    }

    if (limit) {
        options.limit = parseInt(limit);
    } else {
        options.limit = maxLimit;
    }

    if (page) {
        options.page = parseInt(page);
    }

    if (offset) {
        options.offset = parseInt(offset);
    }

    return options;
};

export const createRESTArgumentsFromGraphqlRequest = (context: IGraphQLContext, bodyPayload: any, dataName: DataNames, addPaginationData:boolean = true) => {
    const { pagination,  ...body} = bodyPayload
    const req = {
        ...context.requestInfo.req,
        query: {
            ...pagination
        },
        params: {
            ...body
        }
    } as Request<{params:typeof bodyPayload}, any, any, ParsedQs, Record<string, any>>;
    function isPlural(dataName: DataNames): boolean {
        return dataName.endsWith('s');
    }
    const res = {
        ...context.requestInfo.context.res,
        json: (data: any):{
            [dataName: string]: any,
            pages?: number,
            page?: number,
            offset?: number,
            limit?: number,
            total?: number
        } => {
            const targetData = isPlural(dataName) ? data.docs.map((el:any)=>el.toObject()) : data.docs[0] ? data.docs[0].toObject() : []
            let returnData = {
                [dataName]: targetData,
            };
            if(addPaginationData) {
                returnData = {
                    ...returnData,
                    pages: data.pages,
                    page: data.page,
                    offset: data.offset,
                    limit: data.limit,
                    total: data.total
                }
            }
            return returnData
        }
    } as any;
    const next = (err: any) => {
        throw new Error(err);
    };
    return {req, res, next};
}

