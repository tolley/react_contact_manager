var sequelize = require( '../../config/sequelize' )
	,Sequelize = require( 'sequelize' );

var Users = sequelize.define( 'users', {
	// Define fields for the users table
	id: { 
		type: Sequelize.INTEGER,
		field: 'id',
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type:Sequelize.STRING,
		field: 'username'
	},
	password: {
		type: Sequelize.STRING,
		field: 'password'
	}
}, {
	// Configure the timestamps with our custom field names
	timestamps: true,
	createdAt: 'create_date',
	updatedAt: 'last_update',

	setterMethods: {
		password: function( value ) {
			this.setDataValue( 'password', Sha1.hash( config.hashKey + value ) );
		}
	}
} );

module.exports = Users;