"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const phin_1 = __importDefault(require("phin"));
const uid_1 = __importDefault(require("uid"));
const user_1 = __importDefault(require("./types/user"));
const api_1 = __importDefault(require("./errors/api"));
const collection_1 = __importDefault(require("./types/collection"));
class Client {
    /** Create a new OAuth2 Client. */
    constructor(options) {
        this.options = options;
        this.baseURL = 'https://discord.com/api/';
    }
    /** Generates a authorization code link depending on the scopes and redirect URI set. */
    get authCodeLink() {
        if (this.options.scopes.length > 0) {
            let state = uid_1.default(16);
            return {
                url: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${this.options.id}&scope=${this.options.scopes.join('%20')}&state=${state}&redirect_uri=${this.options.redirectURI}&prompt=none`,
                state
            };
        }
        else if (this.options.scopes.length < 1)
            throw new TypeError('Scopes are not defined.');
    }
    /** Gets the access token for the user to perform further functions. */
    async getAccess(code) {
        if (!code)
            throw new TypeError('Authorization code not provided.');
        try {
            const response = await phin_1.default({
                method: 'POST',
                url: `${this.baseURL}oauth2/token`,
                parse: 'json',
                form: {
                    client_id: this.options.id,
                    client_secret: this.options.secret,
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: this.options.redirectURI,
                    scope: this.options.scopes.join(' ')
                }
            });
            if (response.statusCode === 200) {
                let token = response.body;
                token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
                return jsonwebtoken_1.default.sign(token, this.options.secret, { expiresIn: token['expires_in'] });
            }
            else
                throw new api_1.default(response.statusCode);
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err['phinResponse']?.statusCode));
        }
    }
    /** Gets a new access token for the user whose access token has expired. */
    async refreshToken(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await phin_1.default({
                url: `${this.baseURL}oauth2/token`,
                method: 'POST',
                parse: 'json',
                form: {
                    client_id: this.options.id,
                    client_secret: this.options.secret,
                    grant_type: 'refresh_token',
                    refresh_token: access.refresh_token,
                    redirect_uri: this.options.redirectURI,
                    scope: this.options.scopes.join(' ')
                }
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            let token = response.body;
            token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
            return jsonwebtoken_1.default.sign(token, this.options.secret, { expiresIn: token['expires_in'] });
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err.phinResponse?.statusCode));
        }
    }
    getAccessKey(key) {
        try {
            return jsonwebtoken_1.default.verify(key, this.options.secret);
        }
        catch {
            throw new TypeError('Invalid key provided');
        }
    }
    /** Gets the user who has authorized using the OAuth2 flow. */
    async getUser(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await phin_1.default({
                url: `${this.baseURL}users/@me`,
                method: 'GET',
                headers: { Authorization: `${access.token_type} ${access.access_token}` },
                parse: 'json'
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            return new user_1.default(response.body);
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err['phinResponse']?.statusCode));
        }
    }
    /** Gets the guilds of an authorized user. */
    async getGuilds(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await phin_1.default({
                url: `${this.baseURL}users/@me/guilds`,
                method: 'GET',
                headers: { Authorization: `${access.token_type} ${access.access_token}` },
                parse: 'json'
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            return new collection_1.default(response.body);
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err['phinResponse']?.statusCode));
        }
    }
    /** Gets the connected third-party accounts of an authorized user. */
    async getConnections(key) {
        const access = this.getAccessKey(key);
        try {
            const response = await phin_1.default({
                url: `${this.baseURL}users/@me/connections`,
                method: 'GET',
                headers: { Authorization: `${access['token_type']} ${access['access_token']}` },
                parse: 'json'
            });
            if (response.statusCode !== 200)
                throw new api_1.default(response.statusCode);
            return new collection_1.default(response.body);
        }
        catch (err) {
            throw (err.error
                ? new TypeError(err.error)
                : new api_1.default(err['phinResponse']?.statusCode));
        }
    }
}
exports.default = Client;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdFQUErQjtBQUMvQixnREFBd0I7QUFDeEIsOENBQXNCO0FBQ3RCLHdEQUFnQztBQUNoQyx1REFBb0M7QUFFcEMsb0VBQTRDO0FBTzVDLE1BQXFCLE1BQU07SUFHekIsa0NBQWtDO0lBQ2xDLFlBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFIbEMsWUFBTyxHQUFHLDBCQUEwQixDQUFDO0lBR0EsQ0FBQztJQUU5Qyx3RkFBd0Y7SUFDeEYsSUFBSSxZQUFZO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2xDLElBQUksS0FBSyxHQUFHLGFBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQixPQUFPO2dCQUNMLEdBQUcsRUFBRSx5RUFBeUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssaUJBQWlCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxjQUFjO2dCQUM1TSxLQUFLO2FBQ04sQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN2QyxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUk7WUFDUCxNQUFNLElBQUksU0FBUyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFFMUQsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFRLE1BQU0sY0FBSSxDQUFDO2dCQUMvQixNQUFNLEVBQUUsTUFB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