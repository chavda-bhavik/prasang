import React from "react";
import { Route, Switch } from "react-router-dom";
import PrasangAdmin from "./admin/PrasangAdmin";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

const upload = createUploadLink({
    // process.env.REACT_APP_SERVER_URL
    uri: "http://localhost:8080/graphql",
    headers: {
        "keep-alive": "true",
    },
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("Prasangtoken");
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(upload),
    cache: new InMemoryCache(),
    // ApolloLink.from([upload,authLink.concat(httpLink)]),
    // authLink.concat(httpLink)
});
function App() {
    console.log(process.env.REACT_APP_SERVER_URL);
    return (
        <>
            <Switch>
                {/* <Route path="/prasangadmin/login" component={PrasangAdminLogin}/> */}
                <ApolloProvider client={client}>
                    <Route path="/" component={PrasangAdmin} />
                </ApolloProvider>
                {/* <Route path="/" component ={PrasangUser}/> */}
            </Switch>
        </>
    );
}

export default App;
