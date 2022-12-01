import Registration from "./registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login";

export default function Welcome() {
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
                        <Route
                            path="/register"
                            element={<Registration />}
                        ></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
