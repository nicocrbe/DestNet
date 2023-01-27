import {Container} from "@mui/material"
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails"
import Messenger from "./components/Messenger/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = ()=> {

    const user = JSON.parse(localStorage.getItem("profile"))
    return(
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <NavBar />
                    <Routes>
                        <Route path="/" forceRefresh={true} element={<Navigate to="/posts" replace/>}/>
                        <Route path="/posts"  element={<Home />} />
                        <Route path="/posts/search"  element={<Home />} />
                        <Route path="/posts/:id"  element={<PostDetails />} />
                        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" replace />}/>
                        <Route path="/messenger" element={!user ? <Auth /> : <Messenger />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App