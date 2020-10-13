import React, {Component} from "react";
import {Button,TextField} from '@material-ui/core';
import loginImg from "./Login.svg";
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Image} from 'react-bootstrap';
import Fire from "./config/fire";

//Styles
import './style.css';

//reactstrap API
import {Col,Container,Row} from 'reactstrap';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  //Update state when email address is entered 
  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  //
  handleSubmit(event){
      event.preventDefault();
      this.reset(this.state.email);    
  }

  //Send password reset email
  reset(e){
    e.preventDefault();
    Fire.auth().sendPasswordResetEmail(this.state.email).then(function(){
      alert("Check your emails");
    }).catch((error)=>{
      alert(error)
    });
  }

  render(){
    return (
      <Container>
        <div style={{textAlign:"center"}}>
          <img style={{width:"350px",margin:"10px"}} src={loginImg}/>
        </div>
        <br/>
        <div style={{textAlign:"center"}}><div ><h1 style={{textDecoration:"none",fontFamily:"Courier New"}}>Sign In</h1></div></div>

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
          <Button 
            fullWidth="true"
            size = "small" 
            className="buttons" 
            type="submit"
            value="Submit"
            variant="contained"
            onClick={this.reset}
            style={{backgroundColor:"#5bc0de", textTransform:"none"}}
          > 
            Send me a reset link
          </Button>
          <div style={{textAlign:"center", cursor:"default", marginTop:"5px"}}>
              <p>Back to <Link className="loginLinks" to="/signin"> Sign in </Link> page</p>
          </div>
        </form>
      </Container>
    );
  }
}
export default ForgotPassword;