import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messages from './AppData.jsx';import messags from './AppData.jsx';
import user from './AppData.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      loading: true,
      messages: user.messages,
      user: user
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }
  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
       console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        loading: false,
        messages: messages

      }); // this triggers a re-render!
    }, 3000)
  }

   _handleKeyPress(e){
    if(e.keyCode === 13){

     const newMessage = {
       
        username: user.currentUser.name,
        content: e.target.value
      }

      this.setState({
        messages: this.state.messages.concat(newMessage)
      });
      }
    }
  

  render() {

    return (
    <div>
     <nav className="navbar">
  		<a href="/" className="navbar-brand">Chatty</a>
	</nav>
{this.state.loading ? <h2>Loading...</h2>: <MessageList messages={this.state.messages}/>}
	
	<ChatBar user = {this.state.user} onKeyPress={this._handleKeyPress}/>
    </div> 

    );
  }
}
export default App