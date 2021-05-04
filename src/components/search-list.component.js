import React, { Component } from "react";
import Select from "react-select";

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.getSelectedOption(selectedOption);
    console.log("Option selected:", selectedOption);
  };
  render() {
    return (
      <Select
        value={this.selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}
export default SearchList;
