import React from 'react';
import { Route } from 'react-router-dom';
import ContactList from '../containers/contact-list';
import ContactDetail from '../containers/contact-detail';

export default class ContactsComponent extends React.Component {
 render () {
   return (
     <div>
       <ContactList />
       <Route path="/:contactId" component={ ContactDetail} />
     </div>
   )
 }
}
