import React, {useEffect, useState} from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import useStyles from "./styles"
import FileBase from "react-file-base64"
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";

const Form = ({currentId, setCurrentId}) => {

    const initialPost = {
        creator: "",
        title: "",
        message: "",
        hashtags: [],
        file: ""
    }

    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState(initialPost)
    const post = useSelector((state) => currentId ? state.posts.find((p) => p.id === currentId) : null)

    useEffect(()=> {
        if(post){
            setPostData(post)
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData))
        }
        handleClear()
    }

    const handleClear = () => {
        setCurrentId(null)
        setPostData(initialPost)
    }

    return (
        <Paper>
            <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} Post</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({...postData, creator: e.target.value})}    
                />
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