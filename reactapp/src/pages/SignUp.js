import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import firebase from '../config/firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');

    class Popup extends React.Component {
        render() {
            return (
            <div className='popup'>
                <div className='popup_inner'>
                <h1>{this.props.text}</h1>
                <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
            );
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            user.updateProfile({
                displayName: name,
            });
        })
        .catch(err => {
            console.log(err);
        });
        setEmail('')
        setName('')
        setPassword('')
    };
    

    return (
        <div class='initialBox'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Name</label>
                    <input
                        name='name' 
                        type='name' 
                        id='name' 
                        placeholder='name' 
                        value={name}
                        onChange={e=>{
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        name='email' 
                        type='email' 
                        id='email' 
                        placeholder='Email'
                        value={email}
                        onChange={e=>{
                            setEmail(e.target.value)
                            
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        name='password' 
                        type='password' 
                        id='password' 
                        placeholder='Password' 
                        value={password}
                        onChange={e=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <p color='red'>※パスワードは6文字以上の英数字で入力してください</p>
                </div>
                
                <button 
                    type='submit'
                    className='btn'
                ><span>Sign Up</span></button>
            </form>

            <Link to="/login">To Login Page</Link>
        </div>
    )
}
export default SignUp