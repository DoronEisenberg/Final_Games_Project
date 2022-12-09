import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function PersonalProfile(props) {
    const { id } = useParams();
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    useEffect(() => {
        fetch(`/PersonalProfile/${id}`)
            .then((res) => res.json())
            .then((otherUser) => {
                setUserData(...otherUser);
                // console.log("USER DATA OTHER: ", userData);
            })
            .catch((error) => console.log(error));
    }, []);

    if (props.userData.id === parseInt(id)) {
        navigate("/");
    }
    return (
        <section className="others-section">
            <h1>other profile</h1>
            <img
                src={userData.pictureurl || "..ProfilePhotos/Tom.gif"}
                alt="{userData.firstname + userData.lastname}"
                className="otheruserpic"
            />
            Bio of {userData.firstname} {userData.lastname}:
            <p>{userData.biotext}</p>
            <Friendbutton id={props.userData.id} />
            <button onClick={goHome}>HOME</button>
        </section>
    );
}
