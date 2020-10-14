import React, { Component, useState } from 'react';
//Views
//import Landing from "./landing/Landing.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Components
import Questionnaire from "./questionnaire/questionnaire.js";
import SignIn from "./login/signin.js";
import SignUp from "./login/signup.js";
import ForgotPassword from "./login/forgotpassword.js";
import Landing from "./landing/Landing.js";
import Beginner from "./levels/Beginner.js";
import Intermediate from "./levels/Intermediate.js";
import Advanced from "./levels/Advanced.js";
import Addresource from "./addresource/Addresource.js";
import Ebooks from "./ebooks/Ebooks.js";
import ProfilePage from "./login/ProfilePage.js";
import Header from "../components/header/Header.js";

//Styles
import "./App.scss";

//Firebase
import fire from "./login/config/fire.js";

//Material UI API
import Button from '@material-ui/core/Button';

export default function App(){
    const [user, setUser] = useState(null)

    const handleUser = (userDetails) => {
      setUser(userDetails);
    }    

    return (
    	<Router>
        <Header user={user} handleUser={handleUser}/>
    		<Switch>
    			<Route 
          exact 
          path={"/"}
    			render = {props =>(
            <Landing user={user} { ...props} />
          )}>
    			</Route>

          

    			<Route 
          path={"/questionnaire"}
          render = {props =>(
          <Questionnaire user={user} { ...props} />
          )}>
   				</Route>

          <Route 
          path={"/profilepage"}
          render = {props =>(
          <ProfilePage user={user} { ...props} />
          )}>
          </Route>

          <Route 
          path={"/ebooks"}
          render = {props =>(
          <Ebooks { ...props} />
          )}>
          </Route>

          <Route 
          path={"/addresource"}
          render = {props =>(
          <Addresource user={user} { ...props} />
          )}>
          </Route>

   				<Route path={"/signin"}
            render = {props =>(
            <SignIn { ...props} user={user}  handleUser={handleUser} />
          )}>
   				</Route>

          <Route path={"/signup"}
            render = {props =>(
            <SignUp { ...props} />
          )}>
          </Route>

          <Route path={"/forgotpassword"}
            render = {props =>(
            <ForgotPassword { ...props} />
          )}>
          </Route>

   				<Route path={"/beginner"}
            render = {props =>(
            <Beginner { ...props} />
          )}>
   				</Route>

   				<Route path={"/intermediate"}
            render = {props =>(
            <Intermediate { ...props} />
          )}>
   				</Route>

   				<Route path={"/advanced"}
            render = {props =>(
            <Advanced { ...props} />
          )}>
   				</Route>
   			</Switch>
    	</Router>
    );
}
