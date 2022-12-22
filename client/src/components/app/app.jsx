import { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import provider from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
import Logout from "../logout/logout";
import Uploader from "../uploader";
import ProfilePic from "../ProfilePic/profilepic";
import Profile from "../Profile/profile.jsx";
import Game from "../Game/Game.jsx";
import FindPeople from "../FindPeople/FindPeople.jsx";
import OtherProfile from "../otherprofile/otherprofile";
//import { Link } from "react-router-dom";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderOpen: false,
            currentUser: null,
        };
        this.openSesmee = this.openSesmee.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this.openGames = this.openGames.bind(this);
    }
    // nevigate = useNavigate();
    //methods//
    openSesmee() {
        this.setState({ uploaderOpen: true });
    }

    closeSesamee() {
        this.setState({ isUploaderVisible: false });
    }

    // bioUpdate(bio) {
    //     //console.log("bio uppdate", bio);
    //     this.setState({
    //         currentUser: {
    //             ...this.state.currentUser,
    //             bio: bio,
    //         },
    //     });
    // }
    /// to check another way to show the results of find people
    handleclick() {
        location.replace("/findpeople");
    }

    openGames() {
        location.replace("/games");
    }

    profilePicUploaded(url) {
        //console.log("profilePic", url);
        this.setState(
            {
                currentUser: {
                    ...this.state.currentUser,
                    profilepic_url: url,
                },
            },
            () => {
                console.log(this.state);
                this.closeUploader();
            }
        );
    }

    // let handleclick = (e) => {

    // }
    /////////////////////
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
                                    scoreUpdate={(score) =>
                                        this.scoreUpdate(score)
                                    }
                                />
                            }
                        ></Route>
                        <Route path="/findpeople" element={<FindPeople />} />
                        <Route
                            path="/otherprofile/:id"
                            element={
                                <OtherProfile user={this.state.currentUser} />
                            }
                        />
                        <Route
                            path="/logout"
                            element={<Logout userID={this.state.userID} />}
                        />
                        <Route
                            path="../Profile/profile"
                            element={<Profile />}
                        />
                        <Route path="/games" element={<Game />} />
                    </Routes>
                </BrowserRouter>
                {this.state.uploaderOpen && (
                    <Uploader user={this.state.currentUser} />
                )}
                <button onClick={this.handleclick}> Find a new player</button>
                <button onClick={this.openGames}> Go for a game...</button>
            </div>
        );
    }
}
