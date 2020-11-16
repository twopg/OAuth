"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A list of the commonly occurring errors. */
const errors = new Map([
    [400, 'Invalid request made'],
    [401, 'Invalid access token'],
    [403, 'Not enough permissions'],
    [404, 'Resource not found'],
    [405, 'Method not allowed'],
    [429, 'You are being rate limited'],
    [502, 'Server busy, retry after a while']
]);
class APIError extends Error {
    constructor(statusCode, ...params) {
        super(...params);
        this.statusCode = statusCode;
        this.message = errors.get(this.statusCode) || 'An error occurred';
    }
}
exports.default = APIError;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQWlCO0lBQ3JDLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDO0lBQzdCLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDO0lBQzdCLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDO0lBQy9CLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDO0lBQzNCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDO0lBQzNCLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDO0lBQ25DLENBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDO0NBQzFDLENBQUMsQ0FBQztBQUVILE1BQXFCLFFBQVMsU0FBUSxLQUFLO0lBQ3pDLFlBQ1MsVUFBa0IsRUFDekIsR0FBRyxNQUFhO1FBQ2hCLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBRlYsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUl6QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLG1CQUFtQixDQUFDO0lBQ3BFLENBQUM7Q0FDRjtBQVJELDJCQVFDO0FBQUEsQ0FBQyJ9