import React,{useState, useContext,useEffect}from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/header";
import firebase from '../../config/firebase'
import { AuthContext } from '../../AuthService'
import moment from "moment";

const PostEdit=()=>{
    const [editTitle,setEditTitle]=useState("")
    const [editText, setEditText]=useState("")
    const [posts, setPosts] = useState([])
    const user = useContext(AuthContext)
    const [editId, setEditId] = useState("")

    const modal = document.getElementById('modal');
    const mask = document.getElementById('mask');
    
    useEffect(() => {
        firebase.firestore().collection('posts')
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setPosts(posts)
            })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        var timestamp = moment().valueOf();
        firebase.firestore().collection('postEdit')
            .orderBy("timestamp", "desc")
            .limit(1)
            .onSnapshot(function(snapshot) {
                snapshot.forEach(function(doc) {
                    const editId = doc.id
                    setEditId(editId)
                    return editId
                });
            });
        console.log(editId)
        firebase.firestore().collection('posts')
            .doc(editId).update({
                user: user.displayName,
                title:editTitle,
                text:editText,
                timestamp:timestamp,
            })
        if (editText.trim() === '') return alert('文字を入力してください');
    };
    const handleReset =()=>{
        setEditId('');
        modal.classList.add('hidden');
        mask.classList.add('hidden');
    }
    return(
        <>
            <Header/>
            <div className='body'>
                <Link to={'/'}>to Home</Link>
                <h1>Edit Posts</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Write a title"
                    />
                    <br/>
                    <textarea
                        className="postForm__text"
                        value={editText}
                        type="text" 
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Write a caption"
                    />
                    <br />
                    <button
                        disabled={editText.trim() === ''} 
                        id="open"
                        onClick={()=>{
                            modal.classList.remove('hidden');
                            mask.classList.remove('hidden');
                        }}
                    >修正完了</button>
                    
                </form>
                <div id="mask" className="hidden"></div>
                <section id="modal" className="hidden">
                    <form onSubmit={handleSubmit} >
                        <section className="hidden">
                            <p>修正を完了しますか？</p>
                            <button
                                id="close" 
                                onClick={()=>{
                                    modal.classList.add('hidden');
                                    mask.classList.add('hidden');
                                }}>
                                完了する
                            </button>
                        </section>
                    </form>
                    <button
                        id="close"
                        onClick={handleReset}
                    >戻る</button>
                </section>
                    
                
            </div>
        </>
    )
}

export default PostEdit