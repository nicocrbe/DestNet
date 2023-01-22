import React from "react"
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { MuiChipsInput } from 'mui-chips-input'
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import useStyles from "./styles"
import {getPostsBySearch } from "../../actions/posts"
import Paginate from "../Pagination"
import { useDispatch } from "react-redux";
import {useState} from "react"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = ()=> {

    const [currentId, setCurrentId] = useState(null)
    const [search,setSearch] = useState("")
    const [tags,setHashtags] = useState([])

    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get("page") || 1
    
    const searchQuery = query.get("searchQuery")

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(",")}))
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)
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
        setHashtags([...tags,newTag])
    }

    const handleDeleteHashtag = (tagToDelete) => {
        setHashtags(tags.filter(tag => tag !== tagToDelete))
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
                        value={tags}
                        onAddChip={handleAddHashtag}
                        onDeleteChip={handleDeleteHashtag}
                        label="Search tags"
                        variant="outlined"
                    />
                    <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search post</Button>
                </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    {(!searchQuery && !tags.length) && (
                        <Paper className={classes.pagination} elevation={6}>
                        <Paginate page={page}/>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home