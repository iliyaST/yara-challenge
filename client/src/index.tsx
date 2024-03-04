import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import App from "components/App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4431/graphql",
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
