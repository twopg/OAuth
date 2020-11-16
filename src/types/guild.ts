import Collection from './collection';

const enum PermissionType {
  'CREATE_INSTANT_INVITE' = 1,
  'KICK_MEMBERS' = 2,
  'BAN_MEMBERS' = 4,
  'ADMINISTRATOR' = 8,
  'MANAGE_CHANNELS' = 0x10,
  'MANAGE_GUILD' = 0x20,
  'ADD_REACTION' = 0x40,
  'VIEW_AUDIT_LOG' = 0x80,
  'VIEW_CHANNEL' = 0x400,
  'SEND_MESSAGES' = 0x800,
  'SEND_TTS_MESSAGES' = 0x100,
  'MANAGE_MESSAGES' = 0x2000,
  'EMBED_LINKS' = 0x4000,
  'ATTACH_FILES' = 0x8000,
  'READ_MESSAGES_HISTORY' = 0x10000,
  'MENTION_EVERYONE' = 0x20000,
  'USE_EXTERNAL_EMOJIS' = 0x40000,
  'CONNECT' = 0x100000,
  'SPEAK' = 0x200000,
  'MUTE_MEMBERS' = 0x400000,
  'MANAGE_NICKNAMES' = 0x800000,
  'MANAGE_ROLES' = 0x1000000,
  'MANAGE_WEBHOOKS' = 0x2000000,
  'MANAGE_EMOJIS' = 0x4000000
};

export default class Guild {
  /** The guild's unique discord ID. */
  readonly id: string;
  /** Name of the guild. */
  readonly name: string;
  /**  The guild's icon hash. */
  readonly iconHash: string;
  /** A list of the discord-enabled features of the guild. */
  readonly features: string[]
  /** Whether the authorized user is the guild's owner. */;
  readonly isOwner: boolean;
  /** A list of permissions that the authorized user has in this guild. */
  readonly permissions: string[];

  /** The timestamp of creation of the user's account. */
  get createdTimestamp() {
    return parseInt((BigInt('0b' + parseInt(this._id).toString(2)) >> 22n).toString()) + 1420070400000;
  }
  /** The time of creation of the user's account. */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  constructor({ id, name, icon, features = [], owner = false, permissions = 0 }) {
    this.id = id;
    this.name = name;
    this.iconHash = icon;
    this.features = features;
    this.isOwner = owner;
    this.permissions = this.parsePermissions(permissions);
  }

  private parsePermissions(perms: PermissionType) {
    const arr = [];

    for (const c of Object.values(PermissionType)) {
      let x = parseInt(c);
      const hasPerm = (x & perms) === x;
      if (hasPerm)
        arr.push(PermissionType);
    }
    return arr;
  }

  /**
   * Returns a url to the guild icon.
   * @param size The size of the icon in pixels. (Defaults to 512)
   */
  iconUrl(size = 512): string {
    return this.iconHash
      ? `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${
          this.iconHash.startsWith('a_') ? 'gif' : 'png'}?size=${size}`
      : 'https://i.imgur.com/LvroChs.png';
  }
}
