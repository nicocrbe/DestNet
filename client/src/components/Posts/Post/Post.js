import React from "react";
import useStyles from "./styles"
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment"
import {useDispatch} from "react-redux"
import { deletePost, likePost } from "../../../actions/posts";
import {useNavigate} from "react-router-dom"

const Post = ({post, setCurrentId}) => {

    const {id, title, message, hashtags, file, likeCounter, createdAt} = post
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("profile"))
    const navigate = useNavigate()

    const Likes = () => {
        if(likeCounter.length > 0){
            return likeCounter.find(like => like===(user?.result?.sub || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likeCounter.length > 2 ? `You and ${likeCounter.length -1} others` : `${likeCounter.length} like${likeCounter.length > 1 ? "s" : ""}`}</>
            ):(
                <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likeCounter.length}{likeCounter.length === 1 ? "Like" : " Likes"}</>
            )
        } 

        return <><ThumbUpAltOutlinedIcon fontSize="small"/>&nbsp;Like</>
        
    }
    
    const openPost = () => {
        navigate(`/posts/${id}`)
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={file} title={title} onClick={openPost}>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
                </div>
                </CardMedia>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                    <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{hashtags.map(tag => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result}onClick={()=> dispatch(likePost(id))}>
                        <Likes />
                    </Button>
                    {(user?.result?.sub === post?.creator || user?.result?._id === post.creator) && (
                        <Button size="small" color="primary" onClick={()=> dispatch(deletePost(id))}>
                            <DeleteIcon fontSize="small" />
                            Delete post
                        </Button>
                    )}
                </CardActions>
        </Card>
    )
}

export default Post