import React from "react";
import { withRouter } from "react-router-dom";
import { useAuth } from "../../authentication/use-auth.js";
function Logout(props) {
  const auth = useAuth();
  return (
    <div>
      <h1>Logout</h1>
      <button
        className="btn btn-primary"
        onClick={() =>
          auth.logout(() => {
            this.props.history.push("/");
          })
        }
      >
        Log Out
      </button>
    </div>
  );
}

export default withRouter(Logout);
