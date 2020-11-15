const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			trim: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', function (next) {
	// Check if document is new or a new password has been set
	if (this.isNew || this.isModified('password')) {
		// Saving reference to this because of changing scopes
		const document = this;
		bcrypt.hash(document.password, 12, function (err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

mongoose.model('User', userSchema);
