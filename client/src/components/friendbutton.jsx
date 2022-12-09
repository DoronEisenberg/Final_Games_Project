import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
//import ButtonTextDecider from "./helperFunctions/friendbuttonhelper";

export default function friendbutton(props) {
    const { id } = useParams();

    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState([]);

    useEffect(() => {
        fetch(`/friend/${id}`)
            .then((res) => res.json())
            .then((request) => {
                console.log("request fetch in friend btn: ", request);

                setRequestStatus(request);
            })
            .catch((error) => console.log("PROBLEM IN FRIENDSHIP ", error));
    }, []);

    console.log("REQUEST STATUS HERE: ", requestStatus === "nonexisting");

    return ButtonTextDecider(id, requestStatus);
}
