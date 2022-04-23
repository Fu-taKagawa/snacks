import React,{useState, useContext} from 'react'
import { Link , Redirect} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import { AuthContext } from '../AuthService'

export const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(AuthContext)

    const handleSubmit = e => {
    e.preventDefault();
    firebase
        .auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            alert('メールアドレス・パスワードに間違いがあります。')
        });
    };
    if (user) {
        return <Redirect to="/" />
    }

    return (
        <>
            <div class="initialBox">
                <h1>Login</h1>        
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            type='email' 
                            id='email' 
                            name='email' 
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password'
                            placeholder='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
                <Link to="/signup">sign up</Link>
            </div>
        </>
    )
}

export default Login