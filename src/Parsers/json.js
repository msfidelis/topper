'use strict';

module.exports = async string => {
    try {
        return await JSON.parse(string);
    } catch (e) {
        return string;
    }
};