import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Proba from "./sajatosztalyok/Proba";
import Konyv from "./sajatosztalyok/Konyv";
import Adattorles from "./sajatosztalyok/Adattorles";
import Konyvbevitel from "./sajatosztalyok/Konyvbevitel";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>





<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        
        Kezdőlap
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Konyv" className="sajatosztalyok">Könyv</Nav.Link>

         {/* <Nav.Link href="#pricing">Pricing</Nav.Link>*/}

          <NavDropdown title="Admin" id="collasible-nav-dropdown">
          {showAdminBoard && (
               <NavDropdown.Item href="/Adattorles">Adattorles</NavDropdown.Item>
            )}

           
            <NavDropdown.Item href="#action/3.2">
              

            </NavDropdown.Item>
            <NavDropdown.Item href="/Konyv">Könyv</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Konyvbevitel">
             Könyvbevitel
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {currentUser ?

(
<Nav className="">
 <Nav.Link href="/profile">
 {currentUser.username}
 </Nav.Link>
 <Nav.Link href="/login" onClick={this.logOut}>
 Kijelentkezés

</Nav.Link> </Nav>
)
 :

(

<Nav className="">
 <Nav.Link href="/
login"> Belépés </Nav.Link>

<Nav.Link href="/register">
 Regisztrálás
</Nav.Link>
 </Nav>
)}
      </Navbar.Collapse>
    </Navbar>
  );












{/*

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="sajatosztaly">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Proba"} className="sajatosztalyok">
                Próba
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Konyv"} className="sajatosztalyok">
                Könyv
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/torleskonyvfajtai"} className="sajatosztalyok">
                Könyv fajtai
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}




            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
             {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Konyvbevitel"} className="nav-link">
                  Könyvbevitel
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Adattorles"} className="nav-link">
                 Tipus torles
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Felhasználó
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Kijelentkezés
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
          */}
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Proba" component={Proba} />
            <Route path="/Konyv" component={Konyv} />
            <Route path="/Adattorles" component={Adattorles} />
            <Route path="/Konyvbevitel" component={Konyvbevitel} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
