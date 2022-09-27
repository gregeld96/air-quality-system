const { record, device } = require('../../models');
const fs = require('fs')
const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

class ExportService {
    static async generatePDF() {
        try {
            fs.unlink("example.pdf", function (error) {
                if(error) return '';
            })

            const records = await record.findAll({
                include: [
                    {
                        model: device
                    }
                ]
            });

            let buffer = await this.generateChartScatter(records);

            let theOutput = new PDFDocument();

            // Give name of the PDF
            theOutput.pipe(fs.createWriteStream('example.pdf'));

            // Put Chart Image into PDF
            theOutput.image(buffer, { fit: [350, 250], });

            theOutput.text('The chart based on last 10 records', 0, 375, {
                bold: true,
                align: 'center'
            })
            // End of Chart Image

            theOutput.addPage();

            await this.tablePDF(theOutput, records);

            theOutput.end();
        } catch (error) {
            throw (error)
        }
    }

    static async generateChartScatter(records) {
        try {
            let values = [];

            let limit = records.length;
            let start = records.length - 10;

            let id = 1;

            for (let i = start; i < limit; i++) {
                values.push({
                    x: id,
                    y: records[i].pm25,
                });

                id++;
            }

            const chartJSNodeCanvas = new ChartJSNodeCanvas({ type: 'png', width: 800, height: 600 });

            const configuration = {
                type: "scatter",
                data: {
                    datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: values
                    }]
                },
                options: {
                    legend: { display: false },
                    scales: {
                        xAxes: [{ ticks: { min: 1, max: 10 } }],
                        yAxes: [{ ticks: { min: 10, max: 100 } }],
                    }
                }
            };

            return await chartJSNodeCanvas.renderToBuffer(configuration);
        } catch (error) {
            throw (error);
        }
    }

    static async tablePDF(doc, records) {
        const tableTop = 35
        const deviceName = 25
        const lan = 105
        const long = 185
        const pmIndex = 255
        const quality = 305
        const recorded = 375

        doc
            .fontSize(10)
            .text('Device Name', deviceName, tableTop)
            .text('latitude', lan, tableTop)
            .text('longitude', long, tableTop)
            .text('pm2.5', pmIndex, tableTop)
            .text('Quality', quality, tableTop)
            .text('Recorded Time', recorded, tableTop)

        const items = records;
        let count = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i]

            if (i % 12 === 0 && i !== 0) {
                doc.addPage();
                count = 0;
                doc
                    .fontSize(10)
                    .text('Device Name', deviceName, tableTop)
                    .text('latitude', lan, tableTop)
                    .text('longitude', long, tableTop)
                    .text('pm2.5', pmIndex, tableTop)
                    .text('Quality', quality, tableTop)
                    .text('Recorded Time', recorded, tableTop)
            }

            const y = tableTop + 40 + (count * 40)

            doc
                .fontSize(10)
                .text(item.device.name, deviceName, y)
                .text(item.lan.toFixed(6), lan, y)
                .text(item.long.toFixed(6), long, y)
                .text(item.pm25, pmIndex, y)
                .text(item.quality, quality, y)
                .text(item.recorded_time, recorded, y)

            count++;
        }
    }
}

module.exports = ExportService;