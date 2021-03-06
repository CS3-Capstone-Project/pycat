import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Button,TextField} from '@material-ui/core';
import loginImg from "./Login.svg";
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Image} from 'react-bootstrap';
import Fire from "./config/fire";

//Styles
import './style.css';

//reactstrap API
import {Col,Container,Row} from 'reactstrap';

//Components
import Header from "../../components/header/Header.js";

export default class SignIn extends React.Component {

  constructor(props){
    super(props);
    this.state={
	    email:'',
	    password:'',
	    userid:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.signin = this.signin.bind(this);
   }

   //Update state when one or more of the Textfields are changed 
   handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

   //Sign in, check if current user in the database if they are sign them in otherwise send an error
   signin(e){
      	e.preventDefault();
      	Fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      		.then((u)=>{

      			//Get logged in user data
		        let user = Fire.auth().currentUser;
		        if(user){
		        	Fire.database().ref('User/' + user.uid).once("value", snap => {
		        		//this.props.handleUser(snap.val().firstname);
				        alert("Hey " + snap.val().firstname + ", you are now signed in.");
				        window.location.replace('/');
				    })
		        }
      		})
      		//Catch all of the errors here and display appropriate error message
      		.catch((error) =>{
	      		let errorCode = error.code;
	      		let errorMessage = error.message;
	      		if(errorCode === 'auth/invalid-email'){
	      			alert("Oops, looks like this email is invalid.");
	      		}
	      		else if(errorCode === 'auth/user-not-found'){
	      			alert("It looks like you don't have an account, sign up first.");
	      		}
	      		else if(errorCode === 'auth/wrong-password'){
	      			alert("Your password is incorrect.");
	      		}
	      		else{
	      			alert(errorMessage);
	      		}
	    	});

    }

   render(){
	   	return(
	   		<Container fluid style={{backgroundColor:"#f5f5f5",paddingLeft:"0px", paddingRight:"0px"}}>
		       	
		       	<Container style={{paddingTop:"78px"}}>
		        <div style={{textAlign:"center",marginTop:"10px"}}>
       				<img style={{width:"350px",margin:"10px"}} src={loginImg}/>
       			</div>
       			<br/>
       			<div style={{textAlign:"center"}}><div ><h1 style={{textDecoration:"none",fontFamily:"Courier New"}}>Sign In</h1></div></div>
            	
       			{this.props.user}
		        <form>
		            <TextField
		                label="Email"
		                variant="outlined"
		                fullWidth="true"
		                required="true"
		                size="medium"
		                name="email"
		                onChange={this.handleChange}
		            />

		            <br/><br/>
		            
		            <TextField
		                type="password"
		                label="Password"
		                fullWidth="true"
		                variant="outlined"
		                color="primary"
		                required = "true"
		                size="medium"
		                name="password"
		                onChange={this.handleChange}
		            />
		            <br/><br/>

		            
		            <Button 
			            fullWidth="true"
			            size = "small" 
			            className="buttons" 
			            type="submit"
			            value="Submit"
			            variant="contained"
			            onClick = {this.signin}
			        	style={{backgroundColor:"#5bc0de",textTransform:"none", fontSize:"medium"}}
			        > 
			            Sign in
			        </Button>
		        </form>

		        {/*<div style={{textAlign:"center", marginTop:"10px"}}>
		        	<p>or</p>
		        	<Button 
			            variant="contained"
			            size = "medium" 
			            className="buttons" 
			        	style={{backgroundColor:"#FF6666", textTransform:"none", fontSize:"medium"}}
			        > 
			            Sign in with Google
			        </Button>
			        &nbsp; 
			        <Button 
			            variant="contained"
			            size = "medium" 
			            className="buttons" 
			        	style={{backgroundColor:"#0080FF", textTransform:"none", fontSize:"medium"}}
			        > 
			            Sign in with Facebook
			        </Button>
		        </div>*/}

		        <div style={{textAlign:"center", cursor:"default",marginTop:"5px"}}>
		        	<p>Don't have an account? <Link className="loginLinks" to="/signup">Sign up </Link> <br/>
		        	<Link className="loginLinks" to="/forgotpassword" >Forgot Password?</Link></p>
		        </div>
		        </Container>
	   		</Container>
	   	);
  	}
}