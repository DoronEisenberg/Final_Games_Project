import { Component } from "react";
import { link } from "react-router-dom";

export default class Registration extends Component {
    //here we initialize the component
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        };

        console.log(this.state);

        //------------------------------------------ Bind methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //function called everz time the input text is changed
    handleInputChange(e) {
        console.log(e.currentTarget.value);
        const text = e.currentTarget.value;
        this.setState({
            [e.currentTarget.name]: text,
        });
    }

    //when user click submit, trz to add a new user to the database
    handleSubmit() {
        console.log(this.state);

        fetch("/register", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((response) => {
                //console.log(response);
                if (response.success) {
                    //"success true"
                    location.reload();
                } else {
                    //"success false"
                    //update state to make error appear, also for catch

                    this.setState({
                        error: response.error,
                    });
                    console.log(this.state);
                }
            });
    }

    render() {
        return (
            <div>
                <h1>This is the registration component</h1>
                <div className="error">{this.state.error}</div>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        onChange={this.handleInputChange}
                        placeholder="First name"
                    ></input>
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        onChange={this.handleInputChange}
                        placeholder="Last name"
                    ></input>
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleInputChange}
                        placeholder="Email"
                    ></input>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                        placeholder="Password"
                    ></input>
                </div>
                <div>
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Register Now
                    </button>
                </div>
            </div>
        );
    }
}
