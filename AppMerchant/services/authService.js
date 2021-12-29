const buffer = require('buffer');
const AsyncStorage = require('react-native').AsyncStorage;

const authKey = 'authKey';
const userKey = 'userKey';

class authService {
    getAuthInfo(callback) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if(err) 
                throw err;
            
            if(!val)
                return callback();

            let zippedObject = {};
            val.forEach(v => {
                zippedObject[v[0]] = v[1];
            });
            let authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObject[authKey]
                },
                user: JSON.parse(zippedObject[userKey])
            }
            return callback(null, authInfo);
        });
    }

    login(credentials, callback){
        let encodeAuth = new buffer.Buffer(credentials.username + ':' + credentials.password).toString('base64');

        fetch('https://api.github.com/user',{
            headers: {
                'Authorization': 'Basic ' + encodeAuth
            }
        })
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                return response;
            }
            throw {
                badCredentials: response.status == 401,
                unknowError: response.status != 401
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            AsyncStorage.multiSet([
                [authKey, encodeAuth],
                [userKey, JSON.stringify(result)]
            ], (err) => {
                if(err) throw err;
                return callback({ success: true });
            });
        })
        .catch((error) => {
            return callback({ success: false, error: error });
        });
    }
}

export default new authService();