import Registration from "./registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from "./logout/logout";
import Login from "./login";

export default function Welcome() {
    const handleSubmit = () => {
        fetch("/logout")
            .then((result) => result.json())
            .then(() => {
                if (typeof handleChange == "undefined") {
                }
                location.reload();
            });
    };
    return (
        <div id="welcome">
            <header>
                <img className="logo" src="/logo.png" />
            </header>
            <h1>Welcome!</h1>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Registration />}
                        ></Route>

                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
            <footer>
                <div>
                    <Logout></Logout>
                </div>
            </footer>
        </div>
    );
}
