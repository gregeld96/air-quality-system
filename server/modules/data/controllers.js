const DataService = require("./services");

class DataController {
    static async getData(req, res, next) {
        try {
            res.status(200).json({ success: true, message: "Successful get air quality data", data: await DataService.getCompleteDatas()});
        } catch (error) {
            next(error);
        }
    }

    static async getCategories(req, res, next) {
        try {
            res.status(200).json({ success: true, message: "Successful get air quality category", data: await DataService.getCategories()});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DataController;