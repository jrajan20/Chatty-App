import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
  	const messages = this.props.messages.map(msg =>{
  		return (
  			<Message key={msg.id} msg={msg}/>
  			)
  		});
  
    return (
     
<main className="messages">
  {messages}
  <div className="notification">
    {this.props.notification}
  </div>
</main>

    );
  }
}
export default MessageList;