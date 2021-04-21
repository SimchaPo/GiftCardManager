import React from "react";
import Select from "react-select";
import axios from "axios";
class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.getSelectedOption(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
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
