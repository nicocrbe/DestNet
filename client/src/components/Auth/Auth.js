import React, {useState} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import useStyles from "./styles"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from "react-redux"
import Input from "./Input";
import { useNavigate, redirect } from "react-router-dom";

const Auth = ()=> {

    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = ()=> {

    }

    const handleChange = (e)=> {
        
    }

    const handleShowPassword = ()=> {
        setShowPassword(!showPassword)
    }

    const switchMode = ()=> {
        setIsSignup(!isSignup)
        setShowPassword(false)
    }
   
    const onGoogleAuthSuccess = async(res)=> {

        try {
            dispatch({
                type: "AUTH",
                data: res
            })
        
        navigate("/")
        window.location.reload(true)
        
        } catch (error) {
            console.error(error)
        }
        
    }

    const onGoogleAuthError = (error)=> {
        console.error(error)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar>
                    <LockOutlinedIcon /> 
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last name" handleChange={handleChange} half />                                                           
                                </>
                            )
                        }
                        <Input name="email" label="Email address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type="password"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" >{isSignup ? "Sign up" : "Sign in"}</Button>
                    <GoogleLogin 
                        onSuccess={onGoogleAuthSuccess}
                        onError={onGoogleAuthError}                    
                   />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form> 
            </Paper>
        </Container>
    )
}

export default Auth