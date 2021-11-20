import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { environment } from 'src/environments/environment';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = environment.api_url;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: `https${uri}`, withCredentials: true });

  const ws = new WebSocketLink({
    uri: `ws${uri}`,
    options: {
      reconnect: true,
    }
  });

  const link = split(({ query }) => {
    const data = getMainDefinition(query);
    return (data.kind === 'OperationDefinition' && data.operation === 'subscription');
  }, ws, http);

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
