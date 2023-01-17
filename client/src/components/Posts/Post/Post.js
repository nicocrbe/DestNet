import React from "react";
import useStyles from "./styles"
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment"

const Post = ({post, setCurrentId}) => {

    const {_id, title, message, creator, hashtags, file, likeCounter, createdAt} = post
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={file} title={title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{creator}</Typography>
                <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(_id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{hashtags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
            <CardContent>
                <Typography variant="h5" gutterBottom>{message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=> {}}>
                    <ThumbUpAltIcon fontSize="small" />
                    {` ${likeCounter} Likes `} 
                </Button>
                <Button size="small" color="primary" onClick={()=> {}}>
                    <DeleteIcon fontSize="small" />
                    Delete post
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post