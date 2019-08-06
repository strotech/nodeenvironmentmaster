const schema = `
  
  type showType {
    _id: ID!
    title: String!
    version: String!
    showDetails: [showTypeShowDetails!]!    
  }
  
  input showTypeInput {
    title: String!
    version: String!
    
  }

  type showTypeShowDetails {
    name: String!
    genre: String!
    lead_actor: String!
  }

  input showTypeShowDetailsInput {
    name: String!
    genre: String!
    lead_actor: String!
  }

  

  type myQuery {
    testFunction: String!
    getShowByName(showSchemaName: String!): showType!
  }

  type myMutation {
    createShow(showTypeInputDetails: showTypeInput!,showTypeInputDetailsExtended:showTypeShowDetailsInput!): String!
  }

  schema {
    query: myQuery
    mutation: myMutation
  }
`;

module.exports = schema;