import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import provider from "react-redux";
import React, { useState } from "react";
import Logo from "../logo/logo";
import Logout from "../logout/logout";
import Uploader from "../uploader";
import ProfilePic from "../ProfilePic/profilepic";
import Profile from "../Profile/profile";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderOpen: false,
            currentUser: null,
        };
        this.openSesmee = this.openSesmee.bind(this);
    }
    //methods//
    openSesmee() {
        this.setState({ uploaderOpen: true });
    }
    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then((user) => {
                console.log("user", user);

                this.setState({
                    currentUser: user,
                });
            });
    }

    render() {
        //passing state to child component

        return (
            /* 
we need the <provider inside the render  in the app.js
(the first of the main routes) like 
render() return { and then <Provider store={store}>  
and at the end closing</Provider> 
*/
            <div>
                <Logo user={this.state.currentUser} />
                <ProfilePic user={this.state.currentUser} />

                <Logout />

                <BrowserRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <Profile
                                    openSesmee={this.openSesmee}
                                    user={this.state.currentUser}
                                />
                            }
                        ></Route>
                    </Routes>
                </BrowserRouter>

                {this.state.uploaderOpen && (
                    <Uploader user={this.state.currentUser} />
                )}
            </div>
        );
    }
}
