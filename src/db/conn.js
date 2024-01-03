const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/registrationform', {
    // useNewUrlParse:true,
    // useUnifiedTopology: true,
    // useCreateIndex:true
}).then(console.log("MongoDB is Connected")).catch((err) => {
    console.log(`no connection`)
});