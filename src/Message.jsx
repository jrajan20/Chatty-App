import React, {Component} from 'react';
import user from './AppData.jsx';
class Message extends Component {
  render() {
	let colors = {
      color: this.props.colors
    }
    return (
 

  <div className="message">
    <span className="message-username" style={colors} >{this.props.msg.username}</span>
    <span className="message-content">{this.props.msg.content}</span>
  </div>

    );
  }
}
export default Message;