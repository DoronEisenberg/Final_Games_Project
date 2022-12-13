import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Friendbutton from "../friendbutton";

export default function OtherProfile(props) {
    const { id } = useParams();
    console.log(id);
    console.log("props user", props);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    useEffect(() => {
        fetch(`/users/${id}`)
            .then((res) => res.json())
            .then((otherUser) => {
                setUserData(otherUser);
                console.log("USER DATA OTHER: ", otherUser);
            })
            .catch((error) => console.log(error));
    }, []);

    // if (props.userData?.id === parseInt(id)) {
    //     navigate("/");
    // }
    return (
        <section className="others-section">
            <h1>other personal profile</h1>
            <img
                src={userData.profilepic_url || "..ProfilePhotos/Tom.gif"}
                alt="{userData.firstname + userData.lastname}"
                className="otheruserpic"
            />
            Bio of {userData.firstname} {userData.lastname}:
            <p>{userData.biotext}</p>
            <Friendbutton id={id} />
            <button onClick={goHome}>GO BACK HOME</button>
        </section>
    );
}
