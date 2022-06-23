import {useState} from "react";
import Form from "./Form";
import {nanoid} from "nanoid";

const Post=()=>{
    const [posts, setPosts] = useState([]);
    const addPost = (text) => {
        setPosts([...posts, { content: text, id: nanoid() }]);
    };
    return(
        <>
            <Form 
                addPost={addPost} 
            />
        </>
    )
}

export default Post