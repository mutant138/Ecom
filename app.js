const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect

const errorController = require('./controllers/error');
const User = require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("65a35b730857ec9d635ecd96")
    .then(user => {
      req.user = new User(user.name,user.email,user.cart,user._id)
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

(async ()=>{
  try {
    const client = await mongoConnect();
    //console.log(client)
    app.listen(3000, ()=>{
      console.log('Server is running on port 3000')
    })
  } catch (error) {
    console.log(error)
  }
})()  //Used an Immediately-Invoked Function Expression (IIFE) to start the server after connecting to MongoDB.




