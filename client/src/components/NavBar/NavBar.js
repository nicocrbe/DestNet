import React, {useState, useEffect} from "react"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material"
import useStyles from "./styles"
import destnet from "../../images/logo.png"
import {Link} from "react-router-dom"
import jwt_decode from "jwt-decode"

const NavBar = ()=> {

    const classes = useStyles()
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const getGoogleUser = async(credential) => {
            const decoded = await jwt_decode(credential)
            return decoded
        }
        const userLogged = JSON.parse(localStorage.getItem("profile"))
        if(userLogged){
            getGoogleUser(userLogged?.credential).then(userResult => {
                setUser(userResult)
            })
        }
    },[])

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("profile")
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