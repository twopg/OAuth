import Client from '../src/client';

export default new Client({
  id: '533947001578979328',
  secret: '',
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds']
});
