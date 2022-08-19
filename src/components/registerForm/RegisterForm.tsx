import {FC, useContext, useState} from "react";
import {Context} from "../../index";


export const RegisterForm: FC = () => {



    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [age, setAge] = useState<string>('');

    const {store} = useContext(Context)

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder={'Name'}
            />
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder={'Username'}
            />
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={'Email'}
            />
            <input
                type="text"
                onChange={(e) => {
                    setAge(e.target.value);
                }}
                value={age}
                placeholder={'Age'}
            />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder={'Password'}
            />
            {/*<button>Log In</button>*/}
            <button onClick={() => store.register(email, password, username, name, age)}>Sign Up</button>
        </div>
    );
};

