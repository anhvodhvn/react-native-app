import localStorage from 'local-storage';

export const setUserGuidId = function(userGuidId) {
    return localStorage.set('UserGuidId', userGuidId);
};

export const getUserGuidId = function() {
    return localStorage.get('UserGuidId');
};

export const setDepotIds = function(depotIds) {
    return localStorage.set('DepotIds', depotIds);
};

export const getDepotIds = function() {
    return localStorage.get('DepotIds');
};

export const setLastLogin = function(token) {
    return localStorage.set('LastLogin', token);
};

export const getLastLogin = function() {
    return localStorage.get('LastLogin');
};

export const setUserInfo = function(userInfo) {    
    return localStorage.set('UserInfo', userInfo);
};

export const getUserInfo = function() {    
    return localStorage.get('UserInfo');
};