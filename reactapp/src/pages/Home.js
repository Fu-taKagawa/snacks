import React ,{useState,useEffect,useContext} from "react";
import { Header } from "../components/header/header";
import { Link } from 'react-router-dom'
import firebase from '../config/firebase'
import { AuthContext } from '../AuthService'

const Home=()=>{
    const [posts, setPosts] = useState([])
    const user = useContext(AuthContext)
    
    posts.sort((a, b) => a.timestamp - b.timestamp)
    useEffect(() => {
        firebase.firestore().collection('posts')
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setPosts(posts)
            })
    }, [])

    return(
        <>
            <Header/>
            <div className='body'>
                <ul className='postArea'>
                    {
                        React.Children.toArray(posts.map(posts=>
                            <li className='postItem'>
                                <div className='postTop'>
                                    <Link 
                                        to={'/postEdit'}
                                        onClick={()=>{
                                            const postId = firebase.firestore().collection('posts').doc(`${posts.id}`).id
                                            firebase.firestore().collection('postEdit').doc(`${postId}`)
                                                .set({
                                                    user: user.displayName,
                                                    id: postId,
                                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                                })
                                            console.log(firebase.firestore().collection('posts').doc(`${posts.id}`))
                                        }}>Edit</Link>
                                    <button onClick={(e)=>{
                                        e.preventDefault();
                                        firebase.firestore().collection('posts').doc(`${posts.id}`).delete();
                                        firebase.firestore().collection('postEdit').doc(`${posts.id}`).delete();
                                    }}>Delete</button>
                                </div>
                                <p className='postItem__user'>{posts.user}</p>
                                <div className='postItem__textbox'>
                                    <h1>{posts.title}</h1>
                                    <p>{posts.text}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Home