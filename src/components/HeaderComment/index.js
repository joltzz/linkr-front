import { useState, useEffect, useContext} from "react"
import UserContext from "../../contexts/UserContext.jsx"
import {
    User
} from "./style"

export default function HeaderComment({ comment }) {
    const { userData } = useContext(UserContext);
    
    //fazer a verificação para ver se está seguindo

    return (
        <User>
            <div className="username">{comment.username}</div>
            <div className="follow">
                {comment.userId === userData?.id ?
                    "• post's author"
                    : 
                    "• following"
                }
            </div>
        </User>
    )
}