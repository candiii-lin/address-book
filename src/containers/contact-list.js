import React, {Component} from 'react';
import { connect } from 'react-redux';
import selectContact from '../actions/select_active_contact';
import loadContacts from '../actions/on_load_action';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as _ from 'lodash';

class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      currentlyDisplayed: []
    };

    this.onInputChange = this.onInputChange.bind(this);
  }
  componentWillMount() {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '{contacts{contactId,firstname,lastname}}',
      }),
    }).then(results => {
      return results.json();
    }).then(data => {
      this.props.loadContacts(data.data.contacts);
      this.setState({
        searchTerm: '',
        currentlyDisplayed: data.data.contacts
      });
    });
  }
  onInputChange(evt) {
    let newlyDisplayed = _.filter(this.props.contacts,
      contact => contact.firstname.concat(' ', contact.lastname)
      .toLowerCase()
      .includes(evt.target.value.toLowerCase()));

    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  }
  handleContactSelect(contact) {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{contact(contactId: ${contact.contactId}){contactId,firstname,lastname,phone,address,email}}`,
      }),
    }).then(results => {
      return results.json();
    }).then(data => {
      data.data.contact.edit = false;
      this.props.selectContact(data.data.contact);
    });
  }
  renderList() {
    return this.state.currentlyDisplayed.map((contact) => {
      return (
        <li
        key={contact.contactId}
        onClick={() => {
          this.handleContactSelect(contact)
        }}
        className='list-group-item'><Link to={`/${contact.contactId}`}>{contact.lastname}, {contact.firstname}</Link></li>
      );
    });
  }
  render() {
    return (
      <div className='col-sm-4'>
        <h4>All Contacts</h4>
        <form>
          <fieldset className="form-group">
            <input type="text" className="form-control" placeholder="Search" onChange={this.onInputChange}/>
          </fieldset>
        </form>
        { this.state.currentlyDisplayed.length ? (
          <ul className ='list-group'>
            {this.renderList()}
          </ul>
        ) : (
          <div>There are no contacts in this list.</div>
        )}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectContact: selectContact,
    loadContacts: loadContacts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
