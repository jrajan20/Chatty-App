import React, {Component} from 'react';

class ChatBar extends Component {

  render() {

  	

    return (
   
  <footer className="chatbar">
    <input className="chatbar-username" defaultValue= {this.props.user.currentUser.name} onChange= {this.props.namevalue} />
    <input className="chatbar-message" defaultValue="Type a message and hit ENTER"  onKeyDown = {this.props.onKeyPress}/>
  </footer>
    );
  }
}
export default ChatBar;