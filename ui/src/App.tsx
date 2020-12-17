import React from 'react';
import {Route,Switch} from 'react-router-dom';
import PrasangAdmin from './admin/PrasangAdmin'; 
import { ApolloClient, InMemoryCache,ApolloProvider,createHttpLink, ApolloLink  } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context';

const upload = createUploadLink({
    uri:'http://localhost:3000/graphql',
    headers:{
        "keep-alive":"true"
    }
})
// const httpLink = createHttpLink({
//   uri: 'http://localhost:3000/graphql',
// });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('Prasangtoken');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(upload), 
  cache: new InMemoryCache(),
  // ApolloLink.from([upload,authLink.concat(httpLink)]), 
  // authLink.concat(httpLink)
});
function App() {
  return (
    <>
      <Switch>
          {/* <Route path="/prasangadmin/login" component={PrasangAdminLogin}/> */}
        <ApolloProvider client={client}>
          <Route path="/prasangadmin" component={PrasangAdmin}/>
        </ApolloProvider>
        {/* <Route path="/" component ={PrasangUser}/> */}
      </Switch>
    </>
  );
}

export default App;
