import { IoIosSend } from "react-icons/io"
import {
    User,
    SeparateMessages,
    CommentContent,
    Comment,
    CommentsContent,
    InputComment,
    InputCommentContent
} from "./style"
import { useState, useEffect, useContext} from "react"
import api from "../../services/api"
import UserContext from "../../contexts/UserContext.jsx"
import Loading from "../../assets/Loading"

function Comments({ postId, userId }) {



    const { user } = useContext(UserContext)
    const [text, setText] = useState()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function handleInputChange(e) {
        setText(e.target.value);
    }

    function handlePostComment() {
        api.createComment(user?.token, text, postId, user?.id).then(() => {
            setText("")
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    function getComments() {
        setIsLoading(true)
        api.getComments(user?.token, postId, user?.id).then((res) => {
            setComments(res.data);
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <CommentsContent>
            {isLoading ?
                <Loading />
                :
                comments?.map((comment) =>
                    <Comment key={comment.id}>
                        <CommentContent>
                            <img src={comment.image} />
                            <SeparateMessages>
                                <User>
                                <div className="username">{comment.username}</div>
                                    comment={comment}
                                </User>
                                <div className="coment">{comment.text}</div>
                            </SeparateMessages>
                        </CommentContent>
                    </Comment>
                )
            }
            <InputCommentContent>
                <img src={user?.image} />
                <InputComment
                    id="userComment"
                    name="userComment"
                    placeholder="write a comment..."
                    type="text"
                    onChange={handleInputChange}
                />
                <button id="commentButton" className="ioioSend" onClick={handlePostComment} ><IoIosSend size="20px" /></button>
            </InputCommentContent>
        </CommentsContent>
    )
}

export default Comments;