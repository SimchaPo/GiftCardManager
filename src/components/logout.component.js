import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Logout</h1>
        <button
          className="btn btn-primary"
          onClick={() =>
            this.props.logout(() => {
              this.props.history.push("/");
            })
          }
        >
          Log Out
        </button>
      </div>
    );
  }
}

export default withRouter(Logout);
