var Sequelize = require( 'sequelize' )
	,db_config = require( '../config/database' );

module.exports = new Sequelize( 
						db_config.local_mysql.database,
						db_config.local_mysql.user,
						db_config.local_mysql.password,
{
	host: 'localhost',
	dialect: 'mysql',
	logging: false
} );