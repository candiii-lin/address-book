
const Contacts = require('./data/contacts').contacts;
const _ = require("lodash");

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLInputObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');

const ContactType = new GraphQLObjectType({
  name:'Contact',
  description: "This represent a Contact",
  fields: () => ({
    contactId : { type: new GraphQLNonNull(GraphQLInt)},
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

const ContactUpdateType = new GraphQLInputObjectType({
  name: 'ContactUpdateType',
  type: ContactType,
  fields: {
    contactId: { type: new GraphQLNonNull(GraphQLInt) },
    firstname: { type: GraphQLString},
    lastname: { type: GraphQLString},
    phone: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});


const QueryRootType = new GraphQLObjectType({
  name: 'AddressBookSchema',
  description: "Address Book Query Schema",
  fields: {
    contacts: {
      type: new GraphQLList(ContactType),
      description: "List of all Contacts",
      resolve: function() {
        return Contacts
      }
    },
    contact: {
      type: ContactType,
      args: {
        contactId: {
          name: 'contactId',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      description: "Contact",
      resolve: (root, {contactId}) => {
        let index = Contacts.findIndex(c => c.contactId == contactId);
        return Contacts[index];
      }

    }
  }
});

const ContactMutationType = new GraphQLObjectType({
  name: "ContactMutationType",
  description: "Address Book Query Schema",
  fields: {
    updateContact: {
      type: ContactType,
      args: {
        input: { type: new GraphQLNonNull(ContactUpdateType) }
      },
      resolve: (source, {input}) => {
        let index = Contacts.findIndex(c => c.contactId == input.contactId);

        _.forEach(input, function(value, key) {
          if (key != "contactId") {
            Contacts[index][key] = value
          }
        });

        return Contacts[index];
      }
    }
  }
})

const AddressBookSchema = new GraphQLSchema({
  query: QueryRootType,
  mutation: ContactMutationType
})

module.exports = AddressBookSchema;
