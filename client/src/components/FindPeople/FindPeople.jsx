import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function FindPeople() {
    //an empty list and an empty query that will be filled after making request to db
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    //get searchresult
    useEffect(() => {
        fetch(`/userlist/${searchQuery}`)
            .then((res) => res.json())
            .then((nonfriendsData) => {
                setUserList([...nonfriendsData]);
            });
    }, [searchQuery]);

    const navigate = useNavigate();

    //function to navigate to profile
    function unknownProfile(e, key) {
        navigate(`/otherprofile/${key}`);
    }

    return (
        <section className="center-section">
            <label htmlFor="searchUser">Find New Users</label>
            <input
                type="text"
                name="searchUser"
                className="searchField"
                placeholder="Search here"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {userList.map((user) => (
                <div
                    className="userResults"
                    key={user.id}
                    onClick={(e) => unknownProfile(e, user.id)}
                >
                    <img
                        className="newUser"
                        src={user.profilepic_url || "../ProfilePhotos/Tom.gif"}
                        alt="unknown picture"
                    />
                    {user.firstname} {user.lastname}
                </div>
            ))}
        </section>
    );
}
