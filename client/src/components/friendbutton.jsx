import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
//import ButtonTextDecider from "./helperFunctions/friendbuttonhelper";

export default function friendbutton(props) {
    const { id } = useParams();

    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState({ buttonText: "" });

    useEffect(() => {
        fetch(`/buttontext/${id}`)
            .then((res) => res.json())
            .then((response) => {
                console.log("request fetch in friend button: ", response);

                setRequestStatus(response);
            })
            .catch((error) => console.log("PROBLEM IN GETFRIENDSHIP ", error));
    }, []);

    console.log("REQUEST STATUS HERE: ", requestStatus);
    function handleClick() {
        console.log(requestStatus.buttonText == "Add Friend");
        if (requestStatus.buttonText == "Add Friend") {
            console.log("Add Friend");
            fetch(`/sendRequest/${id}`);
        } else if (requestStatus.buttonText == "Unfriend") {
            fetch(`/unfriendsFriendship/${id}`, { method: "POST" });
            console.log("Unfriend");
        } else if (requestStatus.buttonText == "Cancel") {
            fetch(`/unfriendsFriendship/${id}`, { method: "POST" });
            console.log("Cancel");
        } else if (requestStatus.buttonText == "Accept") {
            fetch(`/acceptsFriendship/${id}`, { method: "POST" });
            console.log("Accept");
        } else {
            console.log("friend request error");
        }
    }
    // console.log("click");

    return <button onClick={handleClick}>{requestStatus.buttonText}</button>;
}
