import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
  	const messages = this.props.messages.map(msg =>{
  		return (
  			<Message key={msg.id} msg={msg} colors = {msg.color}/> 
  		)
  	});


    
    return (
     
      <main className="messages" >

        <span className="notification">
          <section>
            <p>{messages}</p>
          </section>
        </span>

      </main>

    );
  }
}
export default MessageList;