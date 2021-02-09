# 2PG OAuth
Cloned from disco-oauth, but with TypeScript support, and less errors - [Docs](https://twopg.github.io/oauth).

[![Discord](https://img.shields.io/discord/685862664223850497?color=46828d&label=Support&style=for-the-badge)](https://discord.io/twopg)

**Full Examples**: [Demo](/tree/stable/demo), [2PG](https://github.com/twopg/Bot)

## 1 - Install
`npm i -S @2pg/oauth`

## 2 - Use

```js
import { Client } from '@2pg/oauth';

export default new Client({
  id: '533947001578979328',
  secret: '<your_bot_secret>',
  redirectURI: 'http://localhost:3000/auth',
  scopes: ['identify', 'guilds']
});
...
const key = await client.getAccess('<code_from_discord>');
...
const user = await client.getUser(key); // { id: '...', username: 'ADAMJR', ... }
const guilds = await client.getGuilds(key); // Collection<{ id: '...', name: '2PG', ... }>
```

