const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			default: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		ratingCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

mongoose.model('Product', productSchema);
