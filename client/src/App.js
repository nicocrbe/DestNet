import {Container} from "@mui/material"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = ()=> {

    return(
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/auth" element={<Auth />}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App