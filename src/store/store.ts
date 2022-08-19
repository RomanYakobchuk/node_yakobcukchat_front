import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean){
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            // console.log(response)
            localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (err: any) {
            console.log(err.response?.data)
        }
    }

    async register(email: string, password: string, username: string, name: string, age: string) {
        try {
            const response = await AuthService.register(email, password, username, name, age);
            // console.log(response)
            // localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (err: any) {
            console.log(err.response?.data)
        }
    }

    async logout(access_token: any) {
        try {
            await AuthService.logout(access_token);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            window.location.reload();
        } catch (err: any) {
            console.log(err?.response?.data)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refreshToken`, {withCredentials: true})
            // console.log(response)
            // const {userId} = response.data;
            // const user = await
            localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err: any) {
            console.log(err?.response?.data)
        } finally {
            this.setLoading(false)
        }
    }
}