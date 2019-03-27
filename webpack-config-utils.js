
exports.configUtils = {
	outputPathDev: '../dist/', // необходим для работы devserver (можно не изменять);
	outputPathProd: '../dist/', // путь для развертывания на production;
	jsPath: 'assets/js', // относительно outputPathProd || outputPathDev;
	cssPath: 'assets/css', // относительно outputPathProd || outputPathDev;
	htmlFilesPath: './' // относительно outputPathProd || outputPathDev;
};