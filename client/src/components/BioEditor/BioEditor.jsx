import { Component } from "react";
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
        this.editBio = this.editBio.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    ////// METHODS /////
    editBio() {
        this.setState({ editing: true });
    }
    handleInputChange(e) {
        //console.log(e);
        const text = e.currentTarget.value;
        this.setState({
            [e.currentTarget.name]: text,
        });
    }

    handleToggle() {
        this.setState({
            editBio: true,
        });
    }

    handleSubmit() {
        fetch("/BioEditor", {
            method: "POST",
            body: JSON.stringify({ inputBio: this.state.inputBio }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("userData in BIO: ", result.message);
                this.setState({
                    editBio: false,
                    userData: result,
                });
            })
            .catch((error) => {
                console.log("PROBLEM IN BIO: ", error);
            });
    }

    componentDidMount() {
        console.log("here inside biohook");
        fetch("/user")
            .then((res) => res.json())
            .then((userData) => {
                console.log("BIO USER DATA FETCH: ", userData);
                this.setState({ userData: userData });
            })
            .catch((error) => {
                console.log("ERROR FETCH BIO: ", error);
            });
    }

    /*
    componentDidUpdate() {
        if (this.state.biotext !== this.props.userData.biotext) {
            this.setState({
                biotext: this.props.userData.biotext,
            });
        }
    }
    */
    render() {
        const bio = this.props.user?.bio || "";
        return (
            <div>
                <p>Bio Component</p>
                <div>
                    {!this.state.editing && (
                        <div>
                            <div className="biotext">{bio}</div>
                            <button onClick={this.editBio}>edit bio</button>
                        </div>
                    )}
                    {this.state.editing && (
                        <div>
                            <input
                                type="textarea"
                                name="inputBio"
                                onChange={this.handleInputChange}
                                placeholder="add a bio"
                            ></input>
                            <button onClick={this.handleSubmit}>SUBMIT</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
//console.log("this.editBio", this.editBio);
