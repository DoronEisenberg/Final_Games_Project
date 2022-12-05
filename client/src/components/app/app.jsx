import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                                    uploaderOpen={this.uploaderOpen}
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
