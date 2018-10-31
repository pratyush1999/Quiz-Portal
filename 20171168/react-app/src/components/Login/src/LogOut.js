import React, { Component } from 'react';
class LogOut extends Component{
	componentDidMount() {
	localStorage.setItem("admin",JSON.stringify(false)) ;
    localStorage.setItem("loggedIn",JSON.stringify(false));
    localStorage.setItem("username",JSON.stringify(""));
    alert('You Have Succesfully LoggedOut')
    window.location.reload();
	}
	render(){
		return (
			<p>
			
			</p>
			);
	}
} 
export default LogOut;