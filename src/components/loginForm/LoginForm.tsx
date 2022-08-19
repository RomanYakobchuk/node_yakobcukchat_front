import {FC, useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";

import {Context} from "../../index";


const LoginForm: FC = () => {

    // const {register, reset, handleSubmit} = useForm(); //виконується useState, return, useEffect

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {store} = useContext(Context)

    // store.login(email, password)

    return (
        <div>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={'Email'}
            />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder={'Password'}
            />
            <button onClick={() => store.login(email, password)}>Log In</button>
            {/*<button>Sign Up</button>*/}
        </div>
    );
};

export default observer(LoginForm)