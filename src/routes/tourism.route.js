const controller = require('../controllers/tourism.controller');

module.exports = function (app) {
    app.get('/api/tourism', controller.getAllTourism);
    app.get('/api/tourism/:id', controller.getTourismById);
}