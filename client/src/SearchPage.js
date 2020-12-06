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
    const context = this;
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
    const product_items = this.state.items

    return (
      <div className="App">
        <div className="search">
          <div className="container" ref={ref => (this.container = ref)}>
          <div>
            {product_items.map(item => (
                <div>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <img style={{height: 50, width: 50}} src={item.imageURL[0]}/>
                    <a href={item.productURL[0]} target="_blank"><button>Open</button></a>
                    <hr />
                </div>
            ))}
          </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default SearchPage;
