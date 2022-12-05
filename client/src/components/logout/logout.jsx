import { useNavigate } from "react-router-dom";

export default function Logout() {
    const handleLogout = () => {
        fetch("/logout")
            .then((result) => result.json())
            .then(() => {
                if (typeof handleChange == "undefined") {
                }
                location.reload();
            });
    };

    return (
        <>
            <button className="logout-button" onClick={handleLogout}>
                logOut
            </button>
        </>
    );
}
