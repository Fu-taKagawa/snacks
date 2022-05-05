import React,{useContext} from "react";

import firebase from "firebase/compat/app";
import { AuthContext } from "../../AuthService";

export const Header =()=>{
    const user = useContext(AuthContext);
    return(
        <header>
            <h1 className="title">Share Me Snacks!</h1>
            <div className="menu-item">
                <a
                    className="LogoutBtn"
                    href="/"
                    onClick={
                        ()=>{
                            firebase.auth().signOut()
                        }
                    }
                    >Logout
                </a>
                <p>ようこそ {user.displayName} さん</p>
            </div>
        </header>
    )
}
