import React, { Component } from "react";
import Select from "react-select";

class SearchList extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      selectedOption: null,
    };
  }
  componentDidMount() {
    this.setState({ selectedOption: this.props.defaultValue });
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.getSelectedOption(selectedOption);
  };
  render() {
    return (
      <Select
        placeholder={this.props.defaultValue}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}
export default SearchList;
