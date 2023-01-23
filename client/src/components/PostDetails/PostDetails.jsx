import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {useNavigate, useParams} from "react-router-dom"
import {getPost, getPostsBySearch} from "../../actions/posts"
import CommentSection from './CommentSection'

import useStyles from "./styles"

const PostDetails = () => {

  const {post, posts, isLoading} = useSelector((state) => state.posts)
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    
    if(post){
      dispatch(getPostsBySearch({search: "none", tags: post?.hashtags.join(",")}))
    }
  }, [post])

  if(!post) return null

  const recommendedPosts = posts.filter((p) => p.id !== post.id)
  const openPost = (id) => {
    navigate(`/posts/${id}`)
  }

  if(isLoading){
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em"/>
      </Paper>
    )
  }
  return (
    <Paper styles={{padding: "20px", borderRadius: "15px"}} elevation={6}>
      <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.hashtags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.file || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
      </div>
    {recommendedPosts.length ? (
      <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({title, message, name, likeCounter, file, id}) => (
                <div style={{margin: "20px", cursor: "pointer"}} onClick={() => openPost(id)} key={id}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{name}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likeCounter.length}</Typography>
                  <img src={file} width="200px"/>
                </div>
              ))}
          </div>
      </div>
    ) : <Typography variant="h6" gutterBottom>No posts with the same hashtags</Typography>}
    </Paper>
  )
}

export default PostDetails