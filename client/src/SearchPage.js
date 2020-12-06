import React from "react";
import "./SearchPage.css";
//import { Search, Register } from "./components/search/index";

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    //Add .right by default
    //this.rightSide.classList.add("right");
    const context = this
    httpGetAsync("http://localhost:8081/api/item/search", function(responseText) {
        context.setState(prevState => ({ items: JSON.parse(responseText) }));
        console.log(context.state) 
    })
  }

  changeState() {
    
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  network_req = null
  render() {
    const people = [
        { name: 'chris' },
        { name: 'nick' }
    ];

    return (
      <div className="App">
        <div className="search">
          <div className="container" ref={ref => (this.container = ref)}>
          <div>
            {people.map(person => (
                <p>{person.name}</p>
            ))}
          </div>
          </div>
          
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default SearchPage;
