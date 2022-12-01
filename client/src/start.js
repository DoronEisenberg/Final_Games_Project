import { createRoot } from "react-dom/client";
//importing welcome component
import Welcome from "./components/welcome";
import App from "./components/app/app";

//create root element main
const root = createRoot(document.querySelector("main"));

//checking if user is already logged in, fetch data from server
fetch("/user/id.json")
    //I get the response data, and before using it I encode as json
    .then((response) => response.json())
    .then((data) => {
        //if no user id session is saved in the browser, show the welcome component
        if (!data.userId) {
            root.render(<Welcome />);
        } else {
            //otherwise show the logo
            root.render(<App />);
        }
    });
