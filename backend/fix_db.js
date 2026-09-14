const mongoose = require('mongoose');
const Provider = require('./src/models/Provider');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cloudselect')
  .then(async () => {
    // Delete providers with no slug
    const r1 = await Provider.deleteMany({ slug: { $exists: false } });
    console.log('Deleted no-slug:', r1.deletedCount);

    // Delete providers with empty slug
    const r2 = await Provider.deleteMany({ slug: null });
    console.log('Deleted null slug:', r2.deletedCount);

    // Delete providers with empty name
    const r3 = await Provider.deleteMany({ name: { $exists: false } });
    console.log('Deleted no-name:', r3.deletedCount);

    const count = await Provider.countDocuments();
    console.log('Remaining providers:', count);

    mongoose.disconnect();
});