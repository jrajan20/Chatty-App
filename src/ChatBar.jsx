import React, {Component} from 'react';

class ChatBar extends Component {
	constructor(props) {
    	super(props);
    	this.handleEnterMessage = this.handleEnterMessage.bind(this);
    	this.handleEnterName = this.handleEnterName.bind(this);
    }

	handleEnterMessage(e){
		if(e.keyCode === 13){ 
			let message = e.target.value;
			this.props.addMessage(message);
			e.target.value = '';
		}
	}

	handleEnterName(e){
		if(e.keyCode === 13){ 
			let name = e.target.value;
			this.props.userChange(name);
		}
	}

 render() {

 return (   
  <footer className="chatbar">
    <input className="chatbar-username" placeholder= 'Enter Name' onKeyUp= {this.handleEnterName} />
    <input className="chatbar-message" placeholder="Type a message and hit ENTER"  onKeyUp = {this.handleEnterMessage}/>
  </footer>
    );
  }
}
export default ChatBar;