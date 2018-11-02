import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
  	const messages = this.props.messages.map(msg =>{
  		return (
  			<Message key={msg.id} msg={msg} colors = {this.props.usercolor}/>
  			)
  		});
    
    return (
     
<main className="messages" >
  

  <span className="notification">
  {this.props.notification ? 
    <section>
    <p>{messages}</p>
    <p>{this.props.notification}</p>
    </section>
    :
    <p>{messages}</p>
    }  
  </span>
</main>

    );
  }
}
export default MessageList;