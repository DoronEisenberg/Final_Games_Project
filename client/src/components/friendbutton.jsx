import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
//import ButtonTextDecider from "./helperFunctions/friendbuttonhelper";

export default function friendbutton(props) {
    const { id } = useParams();

    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState({ buttonText: "" });

    useEffect(() => {
        fetch(`/sendRequest/${id}`)
            .then((res) => res.json())
            .then((response) => {
                console.log("request fetch in friend button: ", response);

                setRequestStatus(response);
            })
            .catch((error) => console.log("PROBLEM IN GETFRIENDSHIP ", error));
    }, []);

    console.log("REQUEST STATUS HERE: ", requestStatus);
    function handleClick() {
        console.log("click");
    }
    return <button onClick={handleClick}>{requestStatus.buttonText}</button>;
}
