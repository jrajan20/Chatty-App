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
      // count: 4,
      namevalue: user.currentUser.name
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._userChange = this._userChange.bind(this);
  }


 

  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
     this.chattySocket = new WebSocket('ws://0.0.0.0:3001/')
    console.log(this.socket);
    setTimeout(() => {
       console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    this.chattySocket.onmessage = (event)=>{
        console.log(JSON.parse(event.data));
       let msgdata = JSON.parse(event.data);
       this.setState({
        messages: this.state.messages.concat(msgdata),
        count: this.state.count + 1
      });
    }
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
      loading: false,
      }); // this triggers a re-render!

    }, 3000)
  }


   _handleKeyPress(e){
    
    if(e.keyCode === 13){    
     const newMessage = {
        id: this.state.count,
        username: this.state.namevalue,
        content: e.target.value
      }

      this.chattySocket.send(JSON.stringify(newMessage));
      console.log(newMessage.id);
      }
    }

    _userChange(event){
      this.setState({
        namevalue: event.target.value
      })
    }
  

  render() {

    return (
    <div>
     <nav className="navbar">
  		<a href="/" className="navbar-brand">Chatty</a>
	</nav>
{this.state.loading ? <h2>Loading...</h2>: <MessageList messages={this.state.messages}/>}
	
	<ChatBar user = {this.state.user} onKeyPress={this._handleKeyPress} namevalue = {this._userChange}/>
    </div> 

    );
  }
}
export default App