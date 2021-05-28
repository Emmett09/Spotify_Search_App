import React, { Component } from "react";
import cs385spotify from "../images/cs385spotify.png";
import { spotifyArray } from "./Artists.js";

const localArray = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: " ", globalArray: localArray };
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
    console.log("In the constructor App comp");
  } // end constructor

  handleResetButtonClick() {
    this.setState({ searchTerm: " " });
  }

  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>CS385 Spotify Search App</h1>
        <img src={cs385spotify} alt="this is our spotify" />
        <br />

        <ComponentA
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
          buttonHandler={this.handleResetButtonClick}
        />
        <ComponentB
          searchTerm={this.state.searchTerm}
          globalArray={this.state.globalArray}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

//**************************************************//
class ComponentA extends Component {
  render() {
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;
    const buttonHandler = this.props.buttonHandler;
    return (
      <div className="ComponentA">
        <hr />
        <h1>This is ComponentA</h1>
        ComponentA is the search and reset component
        <br />
        <b>Type your search here: </b>
        <input
          type="text"
          value={searchTermFromProps}
          onChange={onChangeFromProps}
        />
        <br />
        <button onClick={buttonHandler}>Press to reset search</button>
        <br />
      </div>
    );
  }
} // close the ComponentA component
//**************************************************//
class ComponentB extends Component {
  arrayFilterFunction(searchTerm) {
    return function (arrObject) {
      let titleFix = arrObject.title.toLowerCase();
      let artistFix = arrObject.artist.toLowerCase();
      let genreFix = arrObject.topgenre.toLowerCase();

      if (searchTerm.length >= 3)
        return (
          searchTerm !== "" &&
          (artistFix.includes(searchTerm.toLowerCase()) ||
            titleFix.includes(searchTerm.toLowerCase()) ||
            genreFix.includes(searchTerm.toLowerCase()))
        );
    };
  }
  render() {
    const arrayPassedAsParameter = this.props.globalArray;
    const searchTermFromProps = this.props.searchTerm;

    let numberResults = arrayPassedAsParameter.filter(
      this.arrayFilterFunction(searchTermFromProps)
    ).length;
    return (
      <div className="ComponentB">
        <hr />
        <h1>This is ComponentB</h1>
        ComponentB is the display component Results are {numberResults}
        <table border="10">
          <tr>
            <th>ID</th>
            <th>Artist</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Duration</th>
          </tr>
          <tbody>
            {arrayPassedAsParameter
              .filter(this.arrayFilterFunction(searchTermFromProps))
              .map((a) => (
                <tr key={a.id}>
                  <td>
                    <b>{a.ID}</b>
                  </td>
                  <td>{a.artist}</td>
                  <td>{a.title}</td>
                  <td>{a.genre}</td>
                  <td>{a.year}</td>
                  <td>{a.dur}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
} // close the ComponentB component

export default App;
