// Maps routes to separate module files.
module.exports = function (app) {
	require('./page')(app);
};