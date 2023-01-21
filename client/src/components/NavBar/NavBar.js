import React, {useState, useEffect} from "react"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material"
import useStyles from "./styles"
import destnet from "../../images/logo.png"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import decode from "jwt-decode"

const NavBar = ()=> {

    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result)
    const credential = JSON.parse(localStorage.getItem("profile"))?.credential
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation() // Listen route

    
    useEffect(() => {
        
        if(credential){
            const decodedCredential = decode(credential)
            
            if(decodedCredential.exp * 1000 < new Date().getTime()){
                alert("Session expired")
                handleLogout()
            }
        }

        setUser(JSON.parse(localStorage.getItem("profile"))?.result)
        
    },[location]) //when route changes, reload

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        navigate("/")
        setUser(null)
    }

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={ Link } to="/" className={classes.heading} variant="h2" align="center">DestNet</Typography>
                <img className={classes.image} src={destnet} alt="DestNet" height="60"></img>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar