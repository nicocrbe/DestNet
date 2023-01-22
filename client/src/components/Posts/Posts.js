import React from "react";
import useStyles from "./styles"
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@mui/material";
import {useSelector} from "react-redux"

const Posts = ({setCurrentId}) => {
    
    const classes = useStyles()
    const {posts, isLoading} = useSelector((state) => state.posts)

    if(!posts.length && !isLoading) return "No posts"

    return (
        
            isLoading ? <CircularProgress/>
            : (
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post.id} item xs={12} sm={12} md={6} >
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
                </Grid>
            ) 
    )
}

export default Posts