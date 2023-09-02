const mongoose = require("mongoose")
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground")

mongoose.set("strictQuery", false)
mongoose
   .connect("mongodb://127.0.0.1:27017/yelp-camp")
   .then(() => {
      console.log("Connected to MongoDB.")
   })
   .catch((err) => {
      console.log("Error connecting to MongoDB\n", err)
   })

const randInt = (x) => Math.floor(Math.random() * x)

const sample = (arr) => arr[randInt(arr.length)]

const seedDB = async () => {
   await Campground.deleteMany({})
   console.log("Campgrounds collection deleted. Reseeding...")
   for (let i = 0; i < 300; i++) {
      const index = randInt(1000)
      const camp = new Campground({
         location: `${cities[index].city}, ${cities[index].state}`,
         title: `${sample(descriptors)} ${sample(places)}`,
         image: "https://source.unsplash.com/random/?campground",
         description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, dolores?",
         price: randInt(200) + 300,
         poster: "63b62bb6374e0546adbc51f8",
         images: [
            {
               url: "/placeholder.jpg",
               filename: "YelpCamp/swog311dsylvrigrvahh",
               originalFilename: "jii.gif",
            },
            {
               url: "/placeholder2.jpg",
               filename: "YelpCamp/swog311dsylvrigrvahh",
               originalFilename: "jii.gif",
            },
         ],
         geometry: {
            type: "Point",
            coordinates: [cities[index].longitude, cities[index].latitude],
         },
      })
      await camp.save()
   }
}

seedDB().then(() => {
   console.log("Finished. Closing Mongoose connection.")
   mongoose.connection.close()
})
