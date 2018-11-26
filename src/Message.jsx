import React, {Component} from 'react';
import user from './AppData.jsx';
class Message extends Component {
  render() {
	let colors = {
      color: this.props.colors
    }
    if (this.props.msg.type == 'incomingMessage'){
      return ( 
        <div className="message">
          <span>  
            <span className="message-username" style={colors}>{this.props.msg.username}</span>
            <span className="message-content">{this.props.msg.content}</span>
            <br/>
          </span>      
        </div>
      );
    }
    if (this.props.msg.type == 'incomingNotification'){
      return ( 
        <div className="message">
          <span>  
            <span className="message-content">{this.props.msg.content}</span>
            <br/>
          </span>      
        </div>
      );
    }
    
  }
}
export default Message;