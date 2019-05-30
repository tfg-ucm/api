const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/sismotur', { useNewUrlParser: true })
    .then(() => console.log('Connected to data store'))
    .catch(err => console.log('Error when connecting to data store', err));

app.use('/_service', require('./routes/service'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/accounts', require('./routes/accounts'));
app.use('/api/v1/beacons', require('./routes/beacons'));
app.use('/api/v1/rewards', require('./routes/rewards'));
app.use('/api/v1/reward-points', require('./routes/rewardPoints'));
app.use('/api/v1/routes', require('./routes/routes'));
app.use('/api/v1/stellar', require('./routes/stellar'));

app.listen(port, () => console.log(`REST listening on port ${port}...`));