import React, {useEffect, useState} from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import useStyles from "./styles"
import FileBase from "react-file-base64"
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector, useDispatch } from "react-redux";

const Form = ({currentId, setCurrentId}) => {

    const initialPost = {
        title: "",
        message: "",
        hashtags: [],
        file: ""
    }

    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState(initialPost)
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p.id === currentId) : null)
    const user = JSON.parse(localStorage.getItem("profile"))
    const navigate = useNavigate()
    
    useEffect(()=> {
        if(post){
            setPostData(post)
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}, navigate))
        }
        handleClear()
    }

    if(!user?.result?.name){
        return (
            <Paper>
                <Typography variant="h6" align="center">Please Sign in to create, edit or like posts</Typography>
            </Paper>
        )
    }

    const handleClear = () => {
        setCurrentId(null)
        setPostData(initialPost)
    }

    return (
        <Paper elevation={6}>
            <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} Post</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}    
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}    
                />
                <TextField 
                    name="hashtags" 
                    variant="outlined" 
                    label="Hashtags" 
                    fullWidth
                    value={postData.hashtags}
                    onChange={(e) => setPostData({...postData, hashtags: e.target.value.split(",")})}    
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, file: base64})}
                    />
                </div>
                <Button 
                    className={classes.buttonSubmit}
                    variant="contained" 
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth>Upload</Button>
                <Button 
                    variant="contained" 
                    color="secondary"
                    size="small"
                    onClick={handleClear}
                    fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form