const server = require('./api/server');

const port = process.env.PORT || 2000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
