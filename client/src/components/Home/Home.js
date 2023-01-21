import React from "react"
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { MuiChipsInput } from 'mui-chips-input'
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import useStyles from "./styles"
import { getPosts } from "../../actions/posts"
import Paginate from "../Pagination"
import { useDispatch } from "react-redux";
import {useState, useEffect} from "react"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = ()=> {

    const [currentId, setCurrentId] = useState(null)
    const [search,setSearch] = useState("")
    const [hashtags,setHashtags] = useState([])

    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    console.log({query})
    const navigate = useNavigate()
    const page = query.get("page") || 1
    
    const searchQuery = query.get("searchQuery")

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    const searchPost = () => {
        if(search.trim()){
            //dispatch fetch search post
        } else {
            navigate("/")
        }
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAddHashtag = (newTag) => {
        setHashtags([...hashtags,newTag])
    }

    const handleDeleteHashtag = (tagToDelete) => {
        setHashtags(hashtags.filter(tag => tag !== tagToDelete))
    }

    return(
        <Grow in>
        <Container maxWidth="xl">
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField 
                        name="search" 
                        variant="outlined"
                        label="Search posts"
                        onKeyDown={handleKeyDown}
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    <MuiChipsInput 
                        style={{margin: "10px 0"}}
                        value={hashtags}
                        onAddChip={handleAddHashtag}
                        onDeleteChip={handleDeleteHashtag}
                        label="Search hashtags"
                        variant="outlined"
                    />
                    <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search post</Button>
                </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper className={classes.pagination} elevation={6}>
                        <Paginate />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home