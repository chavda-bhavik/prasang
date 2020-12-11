import React from 'react';
import {Route,Switch} from 'react-router-dom';
import PrasangAdmin from './admin/PrasangAdmin'; 
import { ApolloClient, InMemoryCache,ApolloProvider  } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'

const upload = createUploadLink({
    uri:'http://localhost:3000/graphql',
    headers:{
        "keep-alive":"true"
    }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link:upload
});
function App() {
  return (
    <>
      <Switch>
        <ApolloProvider client={client}>
          <Route path="/prasangadmin" component={PrasangAdmin}/>
        </ApolloProvider>
        {/* <Route path="/" component ={PrasangUser}/> */}
      </Switch>
    </>
  );
}

export default App;
