export interface PaginateOptions {
	page?: number;
	limit?: number;
	offset?: number;
	sort?: Record<string, number>;
	filter?: Record<string, any>;
}