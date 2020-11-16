/** A collection of Connection objects. */
export default class Connections<T> extends Map {
  set: any;
  clear: any;
  delete: any;

  constructor(connections: any[]) {
    super();

    for (let c of connections)
      this.set(c.id, c as T);
  }

  toJSON() {
    let otr = {};
    this.forEach((g, k) => otr[k] = g);
    return otr;
  }
}
