import { createRoot } from "react-dom/client";
import Welcome from "./components/welcome";

//create root element main
const root = createRoot(document.querySelector("main"));

//check if user is already logged in, fetch data ffrom server
fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        //if no user id session is saved in the browser, show the welcome component
        if (!data.userId) {
            root.render(<Welcome />);
        } else {
            //otherwise show the logo
            root.render(
                <div>
                    <img className="logo" src="/Logo.png" alt="logo" />
                    <p>Hi! Welcome back</p>
                </div>
            );
        }
    });
