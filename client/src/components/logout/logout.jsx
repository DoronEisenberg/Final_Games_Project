import { useNavigate } from "react-router-dom";

export default function Logout() {
    const handleLogout = () => {
        fetch("/logout")
            .then((result) => result.json())
            .then(() => {
                if (typeof handleChange !== "undefined") {
                }
                location.replace("/");
            });
    };
    const redirect = () => {
        return <redirect to={{ pathname: "/" }} />;
    };
    return (
        <>
            <button
                className="logout-button"
                onClick={() => {
                    handleLogout();
                    logoutfunc();
                }}
            >
                logOut
            </button>
        </>
    );
}
