import Registration from "./registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <p>Here is the Logged Component</p>
            <img className="logo" src="/logo.png" />
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
