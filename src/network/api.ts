import Axios from 'axios';

export interface ApiType {
	baseUrl: string;

	get: (url: string, params?: any) => Promise<ResponseType>;
	post: (url: string, data?: any) => Promise<ResponseType>;
	extractError: (response: ResponseType) => any;
}

export interface ResponseType {
	data?: any;
	error?: any;
}

export default class Api implements ApiType {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}
	
	async get(url: string, params?: any) {
		try {
            const response = await Axios.get(url, params);
            const error = this.extractError(response);
            return { data: response.data, error: error };
        } catch (e) {
            // jwtCheck(e);
            return { error: e };
        }
	}

	async post(url: string, data?: any) {
		try {
            const response = await Axios.post(url, data);
            const error = this.extractError(response);
            return { data: response.data, error: error };
        } catch (e) {
            // jwtCheck(e);
            return { error: e };
        }
	}

	extractError(response: ResponseType) {
		if (response.error) {
            return response.error;
		}
		
        return null;
	}
}