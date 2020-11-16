import Guild from './guild';
import Collection from './collection';

/** A collection of guilds. */
export class Guilds extends Collection<Guild> {
  set: any;
  clear: any;
  delete: any;

  constructor(guilds: any) {
    super(guilds);

    for (let g of guilds)
      this.set(g.id, new Guild(g));
  }
}
