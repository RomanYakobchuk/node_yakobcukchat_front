import $api from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";


export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async register(email: string, password: string, username: string, name: string, age: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/register', {name, username, age, email, password})
    }

    static async logout(access_token: any): Promise<void> {
        return $api.post('/auth/logout', {access_token})
    }


}
