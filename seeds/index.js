const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "60b83e74ebd1eb3c84407afc",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/omo06042021/image/upload/v1623126512/YelpCamp/maria-di-lorenzo-6RBApCmRaf0-unsplash_i44pfq.jpg",
          filename: "YelpCamp/maria-di-lorenzo-6RBApCmRaf0-unsplash_i44pfq",
        },
        {
          url: "https://res.cloudinary.com/omo06042021/image/upload/v1623126487/YelpCamp/photo-1599533680895-745e30418674_g9z6ns.jpg",
          filename: "YelpCamp/photo-1599533680895-745e30418674_g9z6ns",
        },
        {
          url: "https://res.cloudinary.com/omo06042021/image/upload/v1623126511/YelpCamp/ben-duchac-3fJOXw1RbPo-unsplash_jfj42i.jpg",
          filename: "YelpCamp/ben-duchac-3fJOXw1RbPo-unsplash_jfj42i",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
