const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		text: {
			type: String,
			trim: true,
		},
		rating: {
            type: Number,
            required: true,
		},
	},
	{ timestamps: true }
);

mongoose.model('Review', reviewSchema);
