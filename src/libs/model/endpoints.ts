export enum Endpoint {
  USERS,
  TV_SHOWS,
  DRINKS,
  INVENTORY
}

export const ENDPOINT_BASE: string = 'https://json-server-vercel-vert.vercel.app/';

export const EndpointPaths = new Map<Endpoint, String>(
  [
    [Endpoint.USERS, 'users'],
    [Endpoint.TV_SHOWS, 'tv-shows'],
    [Endpoint.DRINKS, 'drinks'],
    [Endpoint.INVENTORY, 'inventory']
  ]
)
