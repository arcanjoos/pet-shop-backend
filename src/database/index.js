const mongoose = require('mongoose');
const database = 'petshop'

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(`mongodb://localhost/${database}`);
mongoose.Promise = global.Promise;

module.exports = mongoose;