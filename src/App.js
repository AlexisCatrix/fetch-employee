import { Component } from "react";
import axios from "axios";
import "./App.css";
import DisplayEmployee from "./Components/DisplayEmployee";
import sampleEmployee from "./sampleEmployee";
import LoadingSpinner from "./LoadingSpinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: sampleEmployee,
    };
    this.getEmployee = this.getEmployee.bind(this);
  }

  getEmployee() {
    // Send the request
    this.setState({ loading: true }, () => { axios
      .get("https://randomuser.me/api?nat=US")
      // Extract the DATA from the received response
      .then((response) => response.data)
      // Use this data to update the state
      .then((data) => {
        this.setState({
          // loading: false,
          employee: data.results[0],
          loading: false,
        });
      });})
   
  }

  render() {
    const {loading } = this.state;
    return (
      <div>
        {loading ? <LoadingSpinner /> : <DisplayEmployee employee={this.state.employee}/>}
        <button type="button" onClick={this.getEmployee}>
          Get employee
        </button>
      </div>
    );
  }
}

export default App;
