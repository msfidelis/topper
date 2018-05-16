'use strict';

module.exports = async obj => {
    try {
        return await JSON.stringify(obj);
    } catch (e) {
        return obj;
    }
};