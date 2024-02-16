const { db } = require('../models');
const { tourism: Tourism } = db;
const { convertToRupiah } = require('../utils/helper');

exports.getAllTourism = async (req, res) => {
    try {
        const query = req.query;

        // Define the columns you want to select
        const selectedColumns = ['id', 'place_name', 'description', 'category', 'city', 'price'];

        if (query) {
            // Build the where condition based on the provided parameters
            const whereCondition = {};

            if (query.category) {
                whereCondition.category = query.category;
            }

            if (query.city) {
                whereCondition.city = query.city;
            }

            if (query.price) {
                whereCondition.price = {
                    [db.Sequelize.Op.lte]: parseInt(query.price, 10)
                };
            }

            whereData = await Tourism.findAll({
                where: whereCondition,
                attributes: selectedColumns,
            });

            return res.status(200).json({
                status: "success",
                data: whereData,
            });
        }

        const data = await Tourism.findAll({
            attributes: selectedColumns
        });

        return res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.getTourismById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Tourism.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return res.status(404).json({
                status: "failed",
                message: "Data not found",
            });
        }

        var coordinateObject = JSON.parse(data.coordinate.replace(/'/g, "\""));

        return res.status(200).json({
            status: "success",
            data: {
                id: data.id,
                place_name: data.place_name,
                description: data.description,
                category: data.category,
                city: data.city,
                price: data.price == 0 ? 'Free' : convertToRupiah(data.price),
                rating: (data.rating * 0.10).toFixed(1),
                maps_link: `http://maps.google.com/?q=${coordinateObject.lat},${coordinateObject.lng}`,

            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
}