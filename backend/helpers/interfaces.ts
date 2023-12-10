export interface PaginateOptions {
	page?: number;
	limit?: number;
	offset?: number;
	sort?: Record<string, number>;
	filter?: Record<string, any>;
}

export interface User {
	password: string;
	email: string;
}
