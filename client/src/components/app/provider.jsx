import { createStore } from "redux";
//import { reducer } from '

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.getElementById("main"));

/* 
we need the <provider inside the render  in the app.js
(the first of the main routes) like 
render() return { and then <Provider store={store}>  
and at the end closing</Provider> 
*/
