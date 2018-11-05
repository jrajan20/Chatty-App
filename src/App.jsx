import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// import messages from './AppData.jsx';import messags from './AppData.jsx';
import user from './AppData.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      loading: true,
      messages: user.messages,
      user: user,
      usercount: null,
      namevalue: user.currentUser.name,
      userchange: '',
      usercolor: 'black'
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._userChange = this._userChange.bind(this);
  }


 

  componentDidMount() {
    
    this.chattySocket = new WebSocket('ws://0.0.0.0:3001/')
    
    console.log(this.socket);
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
          messages: this.state.messages.concat(msgdata),
          count: this.state.count + 1
        });
        }

       if (msgdata.type === 'incomingNotification'){
         
          this.setState({
            userchange: msgdata.content
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

//Enter message
  _handleKeyPress(e){
    
      if(e.keyCode === 13){    
       let newMessage = {
          type: 'postMessage',
          id: null,
          username: this.state.namevalue,
          content: e.target.value,
          color: this.state.usercolor
        }
        this.chattySocket.send(JSON.stringify(newMessage));
        console.log(newMessage.id);
        }
      }

//Enter user
    _userChange(event){

      if (event.keyCode === 13){
         let notification = {
          type: 'postNotification',
          content: `${this.state.namevalue} has changed their name to ${event.target.value}`
        }
        if (this.state.namevalue !== event.target.value){
          this.chattySocket.send(JSON.stringify(notification));
        }
        this.setState({
          namevalue: event.target.value
        }) 
      } 

    }
  

  render() {
    let styles = {
      float: 'right'
    }
    return (
      <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className='users-online'><h3>{this.state.usercount} users online</h3></span>
      </nav>
      {this.state.loading ? <h2>Loading...</h2>: 
        <MessageList messages={this.state.messages} 
         notification = {this.state.userchange}
        />}	
    	<ChatBar user = {this.state.user} onKeyPress={this._handleKeyPress} 
        namevalue = {this._userChange} />
      </div> 

    );
  }
}
export default App