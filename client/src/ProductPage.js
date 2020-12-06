import React from "react";
import "./ProductPage.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';


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

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

class ProductPage extends React.Component {
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
    const cart_uuid = document.cookie.split("user_uuid=")[1].split(" ")[0]
    httpGetAsync("http://localhost:8081/api/cart/get?cart_uuid=" + cart_uuid, function(responseText) {
        context.setState(prevState => ({ items: JSON.parse(responseText) }));
        console.log(context.state)
    })
  }

  removeFromCart(item) {
    console.log("Add to cart")
    console.log(item)
    const cart_uuid = document.cookie.split("user_uuid=")[1].split(" ")[0]
    httpGetAsync("http://localhost:8081/api/cart?cart_uuid=" + cart_uuid, function(res) {
        var result = JSON.parse(res)
        console.log("Result : ")
        console.log(result)
        var cart_list = ""
        if (result.error) {
            // Does not exist, do not delete anything
            return
        } else {
            cart_list = result.items
            var tmp_list = cart_list.split(",")
            var serarch_index = tmp_list.indexOf(item.item_uuid)
            if (serarch_index != -1)
                tmp_list.splice(serarch_index, 1)
            cart_list = tmp_list.join()
            //cart_list = ""
        }

        console.log("cart_list : " + cart_list)
        httpGet("http://localhost:8081/api/cart/set?cart_uuid=" + cart_uuid + "&items=" + cart_list)

    })
  }

  changeState() {
    
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const product_items = this.state.items
    var product_by_type = {}
    for (var i=0; i<product_items.length; i++) {
        if (! product_by_type[product_items[i].type_name])
            product_by_type[product_items[i].type_name] = []
        
        product_by_type[product_items[i].type_name].push(product_items[i])
    }

    const isLoggedIn = document.cookie.split("user_uuid=")[1].split(" ")[0] != ""

    console.log(this.state.items)

    return (
      <div className="App">
        <div className="search" style={{position: 'relative', top: 80}}>
          <div className="container" ref={ref => (this.container = ref)}>
          <div>
              <div>
              {Object.keys(product_by_type).map(type_uuid => (
                <div>
                    <h2>{type_uuid}</h2>
                    <div className="flex-container" style={{ margin: 10, overflowX: 'scroll', position: "relative", left: 0}}>
                        {product_by_type[type_uuid].map(item => (
                            <div>
                                <Card className="root">
                                    <CardActionArea style={{height: 300, width: 300}}>
                                        <CardMedia
                                            style={{height: 100}}
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
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{height: 40, background: "white"}}>
                                        <Typography variant="h6" color="textPrimary" component="h2">
                                            {item.price}
                                        </Typography>
                                        {isLoggedIn && (
                                            <Button onClick={() => this.removeFromCart(item)} size="small" color="primary">
                                                <RemoveShoppingCartIcon />
                                            </Button>
                                        )}
                                        <a href={item.productURL} target="_blank">
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

export default ProductPage;

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