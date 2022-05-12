/**
 * Days.js is lightweight date library that uses same API as moment.js
 * cheatsheet: https://devhints.io/moment
 * more detail docs: https://day.js.org/docs/en/display/format
 */
const dayjs = require('dayjs');

/**
 * format date to string to another format
 *
 * @param {String} format - date format to display
 * @param {string} dateTimeString - date time input. default current date and time
 */
exports.date = (format = 'YYYY-MM-DD', dateTimeString) => {
    const d = dateTimeString ? dayjs(dateTimeString) : dayjs();

    return d.format(format);
};
