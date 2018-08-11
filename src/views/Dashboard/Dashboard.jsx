import React, { Component } from 'react';
//project components
import Page from 'views/Page/Page.jsx';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Cards from "components/Cards/Card.jsx";
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
				<Page>
					<GridContainer>
						<GridItem md={1} />
						<GridItem md={1} />
						<GridItem md={4}>
							<Cards />
						</GridItem>
						<GridItem md={4}>
							<Cards />
						</GridItem>
					</GridContainer>
				</Page>
			</div>
		)
	}
}
export default Dashboard;