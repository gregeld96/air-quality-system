const ExportService = require("./service");


class ExportController {
    static async exportPdf(req, res, next){
        try {
            await ExportService.generatePDF()

            res.status(200).json({ success: true, message: "Successful generate pdf"});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ExportController;