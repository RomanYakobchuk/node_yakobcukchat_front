import React, {useContext, useLayoutEffect} from 'react';
import './App.css';
import {RegisterForm} from "./components/registerForm/RegisterForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import LoginForm from "./components/loginForm/LoginForm";
import {CircularProgress} from '@mui/material'
function App() {

    const {store} = useContext(Context);

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [store])

    if(store.isLoading){
        return <CircularProgress size={"50px"}/>
    }

    if (!store.isAuth) {
        return (
            <div>

                <h1>Потрібно авторизуватися</h1>
                <LoginForm/>
            </div>
        )
    }
    // console.log(access_token)

    const LogOut = async () => {
        const access_token = JSON.stringify(localStorage.getItem('token'))
        store.logout(access_token.split('"').join(''))
    }


    return (
        <div>
            <h1>{store.isAuth ? `Користувач авторизований ${store.user?.email}` : `Потрібно авторизуватися`}</h1>
            {/*<LoginForm/>*/}
            {/*<RegisterForm/>*/}
            <button onClick={LogOut}>Log Out</button>
        </div>
    );
}

export default observer(App);
