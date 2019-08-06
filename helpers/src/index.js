    require('es6-promise').polyfill();
    var fetch=require('isomorphic-fetch').fetch;

    const { createApolloFetch } = require('apollo-fetch');
    const fetchQL = createApolloFetch({
    uri: 'http://localhost:4000/graphql',
    });

    fetchQL({
    query: '{testFunction}',
    }).then(res => {
    console.log(res.data.testFunction);
    });

   