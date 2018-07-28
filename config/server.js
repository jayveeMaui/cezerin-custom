// config used by server side only
const dbHost = process.env.DB_HOST || 'ds257551.mlab.com';
const dbPort = process.env.DB_PORT || 57551;
const dbName = process.env.DB_NAME || 'shop';
const dbUser = process.env.DB_USER || 'jayveeTest';
const dbPass = process.env.DB_PASS || 'TestJayvee24';
const dbCred =
	dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : '';

const dbUrl =
	process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

module.exports = {
	// used by Store (server side)
	apiBaseUrl: `http://localhost:3001/api/v1`,

	// used by Store (server and client side)
	ajaxBaseUrl: `http://localhost:3001/ajax`,

	// Access-Control-Allow-Origin
	storeBaseUrl: `https://shop-app-app.herokuapp.com/`,

	// used by API
	adminLoginUrl: '/admin/login',

	apiListenPort: process.env.PORT || 3001,
	storeListenPort: process.env.PORT || 3000,

	// used by API
	mongodbServerUrl: dbUrl,

	smtpServer: {
		host: '',
		port: 0,
		secure: true,
		user: '',
		pass: '',
		fromName: '',
		fromAddress: ''
	},

	// key to sign tokens
	jwtSecretKey: '-',

	// key to sign store cookies
	cookieSecretKey: '-',

	// path to uploads
	categoriesUploadPath: 'public/content/images/categories',
	productsUploadPath: 'public/content/images/products',
	filesUploadPath: 'public/content',
	themeAssetsUploadPath: 'theme/assets/images',

	// url to uploads
	categoriesUploadUrl: '/images/categories',
	productsUploadUrl: '/images/products',
	filesUploadUrl: '',
	themeAssetsUploadUrl: '/assets/images',

	// store UI language
	language: 'en',

	// used by API
	orderStartNumber: 1000,

	developerMode: true
};
