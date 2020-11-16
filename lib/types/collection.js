"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A collection of Connection objects. */
class Connections extends Map {
    constructor(connections) {
        super();
        for (let c of connections)
            this.set(c.id, c);
    }
    /** Convert collection to array. */
    array() {
        return Array.from(this.values());
    }
}
exports.default = Connections;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQTBDO0FBQzFDLE1BQXFCLFdBQWUsU0FBUSxHQUFHO0lBSzdDLFlBQVksV0FBa0I7UUFDNUIsS0FBSyxFQUFFLENBQUM7UUFFUixLQUFLLElBQUksQ0FBQyxJQUFJLFdBQVc7WUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsS0FBSztRQUNILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUFoQkQsOEJBZ0JDIn0=