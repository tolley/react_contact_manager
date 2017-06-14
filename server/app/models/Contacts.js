var sequelize = require( '../../config/sequelize' )
	,Sequelize = require( 'sequelize' )
	,Sha1 = require( '../modules/sha1' )
	,config = require( '../../config' );

var Contacts = sequelize.define( 'contacts', {
	// Define fields for the contacts table
	id: { 
		type: Sequelize.INTEGER,
		field: 'id',
		primaryKey: true,
		autoIncrement: true
	},
	user_id: { 
		type: Sequelize.INTEGER,
		field: 'user_id'
	},
	first_name: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'first_name'
	},
	last_name: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'last_name'
	},
	email_address: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'email_address'
	},
	phone: {
		type:Sequelize.STRING,
		validate: {len: [0, 10]},
		field: 'phone'
	},
	street_address: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'street_address'
	},
	street_address2: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'street_address2'
	},
	city: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'city'
	},
	state: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'state'
	},
	zip: {
		type:Sequelize.STRING,
		validate: {len: [0, 255]},
		field: 'zip'
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

module.exports = Contacts;