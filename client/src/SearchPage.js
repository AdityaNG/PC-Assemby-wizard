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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
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

  addToCart(item) {
    console.log("Add to cart")
    console.log(item)
    const cart_uuid = document.cookie.split("user_uuid=")[1].split(" ")[0]


    httpGetAsync("http://localhost:8081/api/cart/add?user_uuid=" + cart_uuid + "&item_uuid=" +item.item_uuid, function(res) {
      console.log("addToCart")
      console.log(res)
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

    var isLoggedIn = false
    try {
      isLoggedIn = document.cookie.split("user_uuid=")[1].split(" ")[0] !== ""
    } catch(e) {
      isLoggedIn = false
    }

    console.log(this.state.items)

    return (
      <div className="App">
        <div className="search" style={{position: 'relative', top: 80}}>
          <div className="container" ref={ref => (this.container = ref)}>
          <div>
              <div>
              {Object.keys(product_by_type).map(type_uuid => (
                <div key={type_uuid}>
                    <h2>{type_uuid}</h2>
                    <div className="flex-container" style={{ width: "55%", margin: 10, overflowX: 'scroll', position: "relative", left: 400}}>
                        {product_by_type[type_uuid].map(item => (
                            <div>
                                <Card className="root">
                                    <CardActionArea style={{height: 300, width: 300}}>
                                        <CardMedia
                                            style={{height: 100}}
                                            image={item.imageurl}
                                            title={item.name}
                                            />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.description}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{height: 40, background: "white"}}>
                                        <Typography variant="h6" color="textPrimary" component="h2">
                                            {item.price}
                                        </Typography>
                                        {isLoggedIn && (
                                            <Button onClick={() => this.addToCart(item)} size="small" color="primary">
                                                <AddShoppingCartIcon />
                                            </Button>
                                        )}
                                        <a href={item.producturl} target="_blank">
                                        <Button size="small" color="primary">
                                            Open
                                        </Button>
                                        </a>
                                    </CardActions>
                                    </Card>
                            </div>
                        ))}
                    </div>
                    <hr />
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
                    <img style={{height: 50, width: 50}} src={item.imageurl[0]}/>
                    <a href={item.producturl[0]} target="_blank"><button>Open</button></a>
                </div>
            ))}
          </div>
 */