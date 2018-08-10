import React, { Component } from 'react';
//project components
import Navigation from 'components/Navigation/Navigation.jsx';

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

			return (
				<div>
					<Navigation />
				</div>
			)
	}
}
export default Dashboard;