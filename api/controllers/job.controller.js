const { Role } = require('../database/models');
const { defaultLimit } = require('../etc/my-config');
const request = require('request');
const { CustomError } = require('../etc/error-handler');


/** @type {import("express").RequestHandler} */
exports.jobList = (req, res, next) => {
    /** @type {request.CoreOptions} */
    const reqOpt = {
        method: 'GET',
        uri: `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`,
        qs: req.query,
    };
    
    request(reqOpt, (error, response, body) => {
        try {
            if (error) {
                console.log(error.message || error);
                throw new CustomError(500, 'unexpected error');
            }
    
            if (response.statusCode !== 200) {
                console.log(body);
                throw new CustomError(500, 'error in http request');
            }
            
            const jobs = JSON.parse(body);
            res.status(200).json({ jobs });
        } catch (error) {
            next(error);
        }
    });
};

/** @type {import("express").RequestHandler} */
exports.jobDetail = (req, res, next) => {
    const jobId = req.params.id;

    /** @type {request.CoreOptions} */
    const reqOpt = {
        method: 'GET',
        uri: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${jobId}`,
    };

    request(reqOpt, (error, response, body) => {
        try {
            if (error) {
                console.log(error.message || error);
                throw new CustomError(500, 'unexpected error');
            }
    
            if (response.statusCode !== 200) {
                console.log(body);
                throw new CustomError(500, 'error in http request');
            }
            
            const job = JSON.parse(body);
            if (Object.keys(job).length === 0) {
                throw new CustomError(404, 'job not found');
            }

            res.status(200).json({ job });
        } catch (error) {
            next(error);
        }
    });
};
