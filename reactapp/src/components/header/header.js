import React,{useContext} from "react";
import {Link}from "react-router-dom"
import firebase from "firebase/compat/app";
import { AuthContext } from "../../AuthService";

export const Header =()=>{
    const user = useContext(AuthContext);
    return(
        <>
            <header>
                <div className="headerMenu">
                    <a href="/"><h1 className="logo">Share Me Snacks!</h1></a>
                    <ul className="headerMenu__item text-large">
                        <li>
                            <Link to={"/post"}>Post</Link>
                        </li>
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li>
                            <a
                            className="LogoutBtn"
                            href="/"
                            onClick={
                                ()=>{firebase.auth().signOut()}
                            }
                            >Logout
                            </a>
                        </li>
                        <li><p>ようこそ {user.displayName} さん</p></li>
                    </ul>
                </div>
            </header>
        </>
    )
}
