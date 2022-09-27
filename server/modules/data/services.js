const { device, category, record } = require('../../models');
const axios = require('axios');
const apiKey = process.env.API_KEY;

class DataService {
    static async getCompleteDatas(){
        try {
            let datas = [];

            let devices = await device.findAll();

            let categories = await category.findAll();

            for(let device of devices){
                let pm25 = await axios({
                    method: "Get",
                    url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${device.lan}&lon=${device.long}&appid=${apiKey}`
                });

                let pm2_5 = pm25.data.list[0].components.pm2_5;

                let indicator;

                for(let i = 0; i < categories.length; i++){
                    if((categories[i].max === null) && (categories[i].min <= pm2_5)){
                        indicator = categories[i];
                    } else {
                        if(categories[i].min <= pm2_5 && categories[i].max > pm2_5){
                            indicator = categories[i];
                        }
                    }
                }

                let data = {
                    device_id: device.id,
                    name: device.name,
                    lan: device.lan,
                    long: device.long,
                    pm25: pm2_5,
                    quality: indicator.name,
                    recorded_time: new Date()
                }

                datas.push(data)
            }

            await record.bulkCreate(datas);

            return datas;
        } catch (error) {
            throw(error);
        }
    }

    static async getCategories(){
        try {
            let categories = await category.findAll();

            return categories;
        } catch (error) {
            throw(error);
        }
    }
}

module.exports = DataService;