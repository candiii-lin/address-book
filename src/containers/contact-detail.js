import React, { Component } from 'react';
import {connect} from 'react-redux';
import selectContact from '../actions/select_active_contact';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ContactDetail extends Component {
	constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	componentDidMount() {
		let contactId = this.props.match.params.contactId;
		fetch('http://localhost:3000/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `{contact(contactId: ${contactId}){contactId,firstname,lastname,phone,address,email}}`,
			}),
		}).then(results => {
			return results.json();
		}).then(data => {
			data.data.contact.edit = false;
			this.props.selectContact(data.data.contact);
		});
	}
	handleEditRequest() {
		this.props.activeContact.edit=true;
		this.forceUpdate();
	}
	handleSubmit(evt) {
		evt.preventDefault();
		this.props.activeContact.edit=false;
		let contact = JSON.parse(JSON.stringify(this.props.activeContact));
		console.log(contact);
		delete contact.edit;
		fetch('http://localhost:3000/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				query: `mutation {updateContact (
						input: {
							contactId: ${contact.contactId},
							firstname: \"${contact.firstname}\",
							lastname: \"${contact.lastname}\",
							phone: \"${contact.phone}\",
							address: \"${contact.address}\",
							email: \"${contact.email}\"
						}
					)
					{contactId,firstname,lastname,phone,address,email}}`
			}),
		}).then(results => {
			return results.json();
		}).then(data => {
			data.data.updateContact.edit = false;
			this.props.selectContact(data.data.updateContact);
		});

  }
	updateInputValue(evt) {
		this.props.activeContact[evt.target.name] = evt.target.value;
  }
	render() {
		// this.props.contact = this.props.activeContact;
		let contact = this.props.activeContact;
		if (!contact) {
			return (
				<div>Click one of the contacts to see details.</div>
			);
		} else if (contact.edit) {
			return (
				<div className="col-sm-8">
					<h4>{contact.firstname} {contact.lastname}</h4>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label>Phone Number</label>
							<input type="text"
							className="form-control"
							name="phone"
							defaultValue={contact.phone}
							onChange={evt => this.updateInputValue(evt)}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
							type="text"
							className="form-control"
							name="address"
							defaultValue={contact.address}
							onChange={evt => this.updateInputValue(evt)}
							/>
						</div>
					  <div className="form-group">
					    <label>Email address</label>
					    <input
							type="email"
							className="form-control"
							name="email"
							defaultValue={contact.email}
							onChange={evt => this.updateInputValue(evt)}
							/>
					  </div>
					  <button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			)
		} else {
			return (
				<div className="col-sm-8">
					<h4>{contact.firstname} {contact.lastname}</h4>
					<button className="btn btn-primary pull-left"
						onClick={() => {
							this.handleEditRequest()
						}}
					>Edit</button>
					<div>Phone: {contact.phone}</div>
					<div>Address: {contact.address}</div>
					<div>Email: {contact.email}</div>
				</div>
			);
		}
	}

}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
		activeContact: state.activeContact,
		lokka: state.lokka
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectContact: selectContact
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail)
