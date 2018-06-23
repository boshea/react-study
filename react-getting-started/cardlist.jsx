const Card = (props) => {
	return (
  	<div>
    	<img width="75" src={props.avatar_url}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
      	<div>{props.company}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>
  );
}

class Form extends React.Component {
  state = {
    userName: ''
  };

	handleSubmit = (event) => {
  	event.preventDefault();
    // console.log("Event: Form Submit: " + this.state.userName);

		// XXX: Possible security vulnerability: we could enter any data we want into the form,
    // and this will just get blindly appended to the URL and passed to the axios.get() call.
    //
    // axios.get('https://api.github.com/users/${this.state.userName}')
    //	.then(resp => { console.log(resp) });

    axios.get("https://api.github.com/users/" + this.state.userName)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
        this.setState({ userName: '' });
      })
      .catch(error => {
      	console.log("No such user: " + this.state.userName);
			}
		);
  }

	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input
        	type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  // Consider making this an object and using it as a map of username to card info.
  // This would get rid of the problem of duplicates.  Also consider sorting the cards
  // by name to make it easier to look them up in the card list.
	state = {
  	cards: [ ]
  };
  
  addNewCard = (cardInfo) => {
    this.setState(
    	prevState => ( { cards: prevState.cards.concat(cardInfo) } )
    );
  };

	render() {
  	return (
    	<div>
      	<Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);
