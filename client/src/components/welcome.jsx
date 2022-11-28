import Registration from "./registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img className="logo" src="/logo.png" />
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
        </div>
    );
}
