import React from "react";
import './App.css';
import LoginPage from "./LoginPage"
import SearchPage from "./SearchPage"
import ProductPage from "./ProductPage"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const PAGE_LOGIN = 0
const PAGE_SEARCH = 1
const PAGE_CART = 2

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGE_SEARCH
    };
  }

  componentDidMount() {
    //Add .right by default
    //this.rightSide.classList.add("right");
    
  }

  logout_mechanism() {
    document.cookie = "user_uuid="
    window.location.reload()
  }

  login_page() {
    console.log("Login")
    this.setState(prevState => ({ currentPage: PAGE_LOGIN }));
  }

  cart_page() {
    console.log("Cart")
    this.setState(prevState => ({ currentPage: PAGE_CART }));
  }

  search_page() {
    console.log("Cart")
    this.setState(prevState => ({ currentPage: PAGE_SEARCH }));
  }

  render() {
    
    const isLogginPage = this.state.currentPage === PAGE_LOGIN;
    const isSearchPage = this.state.currentPage === PAGE_SEARCH;
    const isCartPage = this.state.currentPage === PAGE_CART;
    var isLoggedIn = false
    try {
      isLoggedIn = document.cookie.split("user_uuid=")[1].split(" ")[0] !== ""
    } catch(e) {
      isLoggedIn = false
    }

    const username = (isLoggedIn)? JSON.parse(httpGet("http://localhost:8081/api/users/search?user_uuid=" + document.cookie.split("user_uuid=")[1].split(" ")[0]))[0].name : ""

    return (
      <div className="App">
        
        {isLogginPage && (
          <LoginPage />
        )}
        {isSearchPage && (
          <div>
            <AppBar position="fixed" style={{position: 'fixed', top: 0, right: 0}}>
              <Toolbar>
                <Typography variant="h6" className="{classes.title}">
                  PC Assembly Wiz
                </Typography>
                <div style={{position: 'fixed', right: 25}}>
                  {!isLoggedIn && (
                    <Button color="inherit" onClick={this.login_page.bind(this)} >Login</Button>
                  )}
                  {isLoggedIn && (
                    <div>
                    <Button color="inherit" onClick={this.logout_mechanism.bind(this)} >Logout {username}</Button>
                    <IconButton onClick={this.cart_page.bind(this)} edge="end" className="{classes.menuButton}" color="inherit" aria-label="menu">
                      <ShoppingCartIcon />
                    </IconButton>
                    </div>
                  )}
                </div>
              </Toolbar>
            </AppBar>
            <SearchPage />
          </div>
        )}

        {isCartPage && (
          <div>
            <AppBar position="fixed" style={{position: 'fixed', top: 0, right: 0}}>
              <Toolbar>
                <IconButton onClick={this.search_page.bind(this)} edge="end" className="{classes.menuButton}" color="inherit" aria-label="menu">
                  <ArrowBackIcon />
                </IconButton>
                <Typography style={{position: "relative", left: 25}} variant="h6" className="{classes.title}">
                  PC Assembly Wiz - My Cart
                </Typography>
                <div style={{position: 'fixed', right: 25}}>
                <Button color="inherit" onClick={this.logout_mechanism.bind(this)} >Logout {username}</Button>
                  
                </div>
              </Toolbar>
            </AppBar>
            <ProductPage />
          </div>
        )}
        
      </div>
    );
  }
}

export default App;
