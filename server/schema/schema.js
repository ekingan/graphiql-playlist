const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

// dummy data
const books = [
  {name: 'Are you my mother', genre: 'Fantasy', id: 1},
  {name: 'Are you my father', genre: 'Fantasy', id: 2},
  {name: 'Are you my sister', genre: 'Fantasy', id: 3}
]
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // code to get data from db
        return _.find(books, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})