const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '616ea9826842cfc455a51061',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae doloremque amet saepe ut maiores modi, necessitatibus ratione, excepturi at perferendis soluta, facere quae nulla harum dolores delectus dicta alias fugiat.',
            price: price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpkxvragr/image/upload/v1635255199/YelpCamp/lnih85d3kon7nojprt1u.jpg',
                    filename: 'YelpCamp/lnih85d3kon7nojprt1u'
                },
                {
                    url: 'https://res.cloudinary.com/dpkxvragr/image/upload/v1635255200/YelpCamp/q1vocgcml336rehayj21.jpg',
                    filename: 'YelpCamp/q1vocgcml336rehayj21'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})