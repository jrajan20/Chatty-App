import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import user from './AppData.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      messages: user.messages,
      user: user,
      usercount: null,
      namevalue: user.currentUser.name,
      usercolor: 'black'
    };

    this.addMessage = this.addMessage.bind(this);
    this.userChange = this.userChange.bind(this);
  }


 

  componentDidMount() {
    
    this.chattySocket = new WebSocket('ws://0.0.0.0:3001/')
     
    setTimeout(() => {
       console.log("Simulating incoming message");
        let users = {
          type: 'usersOnline',
          content: null
        }
  
      this.chattySocket.send(JSON.stringify(users));
       
      // Add a new message to the list of messages in the data store
      this.chattySocket.onmessage = (event)=>{
         console.log(JSON.parse(event.data));
         let msgdata = JSON.parse(event.data);

         if (msgdata.type === 'usersNotification'){
            this.setState({
              usercount: msgdata.content
            })
          }
         if (msgdata.type === 'incomingMessage'){ 
            this.setState({
            messages: this.state.messages.concat(msgdata)
            
          });
         }

         if (msgdata.type === 'incomingNotification'){
           
            this.setState({
              messages: this.state.messages.concat(msgdata)
            })
         }
        
         if (msgdata.type === 'incomingColor'){
          
           this.setState({
            usercolor: msgdata.content
           });
         }     
      }
      this.setState({
      loading: false,
      }); 

    }, 1000)
  }

//Send message to socket
  addMessage(message){ 
       
      let newMessage = {
        type: 'postMessage',
        id: null,
        username: this.state.namevalue,
        content: message,
        color: this.state.usercolor
      }
      this.chattySocket.send(JSON.stringify(newMessage));
      console.log(newMessage.id);
  
  }

//Send new user to socket
  userChange(newName){
    
      let notification = {
        type: 'postNotification',
        content: `${this.state.namevalue} has changed their name to ${newName}`
      }
      
      if (this.state.namevalue !== newName){
          this.chattySocket.send(JSON.stringify(notification));
      }
      this.setState({
          namevalue: newName
      }) 
  }
  

  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className='users-online'><h3>{this.state.usercount} users online</h3></span>
        </nav>
        {this.state.loading ? <h2>Loading...</h2>: 
          <MessageList messages={this.state.messages} 
          />}	
      	<ChatBar user = {this.state.user} addMessage={this.addMessage} 
          userChange = {this.userChange} />
      </div> 

    );
  }
}
export default App