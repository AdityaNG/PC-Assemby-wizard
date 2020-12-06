import React from "react";
import "./SearchPage.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
    var product_by_type = {}
    for (var i=0; i<product_items.length; i++) {
        if (! product_by_type[product_items[i].type_name])
            product_by_type[product_items[i].type_name] = []
        
        product_by_type[product_items[i].type_name].push(product_items[i])
    }

    console.log(this.state.items)

    return (
      <div className="App">
        <div className="search">
          <div className="container" ref={ref => (this.container = ref)}>
          <div>
              <div>
              {Object.keys(product_by_type).map(type_uuid => (
                <div>
                    <p>{type_uuid}</p>
                    <div className="flex-container" style={{ width: 1000, overflowX: 'scroll'}}>
                        {product_by_type[type_uuid].map(item => (
                            <div>
                                <Card className="root">
                                    <CardActionArea style={{height: 290}}>
                                        <CardMedia
                                            style={{height: 140}}
                                            image={item.imageURL}
                                            title={item.name}
                                            />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.description}
                                        </Typography>
                                        <Typography variant="h6" color="textPrimary" component="h2">
                                            {item.price}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{height: 50}}>
                                        <a href={item.productURL} target="_blank">
                                        <Button size="small" color="primary">
                                            Open
                                        </Button>
                                        </a>
                                        <Button size="small" color="primary">
                                        Save
                                        </Button>
                                    </CardActions>
                                    </Card>
                            </div>
                        ))}
                    </div>
                </div>
              ))}
              </div>
              
          </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default SearchPage;

/**
 * <div className="flex-container">
            {product_items.map(item => (
                <div className="p-2">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <img style={{height: 50, width: 50}} src={item.imageURL[0]}/>
                    <a href={item.productURL[0]} target="_blank"><button>Open</button></a>
                </div>
            ))}
          </div>
 */