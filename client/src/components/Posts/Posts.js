import React from "react";
import useStyles from "./styles"
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import {useSelector} from "react-redux"

const Posts = ({setCurrentId}) => {
    
    const classes = useStyles()
    const posts = useSelector((state) => state.posts)
    
    return (
            !posts.length ? <CircularProgress/>
            : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post.id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
                </Grid>
            ) 
    )
}

export default Posts