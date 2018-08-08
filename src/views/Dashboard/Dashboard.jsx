import React, { Component } from 'react';
//gundb
import Gun from 'gun/gun';
const gun = Gun('https://crm-server.herokuapp.com/gun');
const db = gun.get('users')
class Dashboard extends Component {
	constructor(props) {
		super(props);
			this.state = {
				user: '',
			}
	}
	componentDidMount() {
		const { match } = this.props;
		const profile = match.params.id
			db.get(profile).once((user) => {
				this.setState({ user: user })
			});
	}
	render() {
		const { user } = this.state;
			return (
				<div>
					<h1>Welcome {user.username}</h1>
				</div>
			)
	}
}
export default Dashboard;