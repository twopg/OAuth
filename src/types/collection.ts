/** A collection of Connection objects. */
export default class Connections<T> extends Map {
  set: any;
  clear: any;
  delete: any;

  constructor(connections: any[]) {
    super();

    for (let item of connections)
      this.set(item.id, item as T);
  }

  /** Convert collection to array. */
  array(): T[] {
    return Array.from(this.values());
  }
}
