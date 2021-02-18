const express = require('express');

const app = express();
const port = 9000;

app.post('/getSnapShots', (req, res) => {
	req.send({ message: 'Snapshots', snapshots: [] });
});

app.post('/trim', (req, res) => {
	req.send({ message: 'Snapshots', snapshots: [] });
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
