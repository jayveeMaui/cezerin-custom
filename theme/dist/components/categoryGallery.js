import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';

const GalleryItemImage = ({ category }) => {
	const imageUrl = category.image && category.image.length > 0 ? helper.getThumbnailUrl(category.image, themeSettings.category_list_thumbnail_width) : '';

	if (imageUrl && imageUrl !== '') {
		return React.createElement(
			'div',
			{ className: 'card-image' },
			React.createElement(
				'figure',
				{ className: 'image' },
				React.createElement('img', { src: imageUrl, alt: category.name })
			)
		);
	} else {
		return null;
	}
};

const GalleryItem = ({ category }) => {
	return React.createElement(
		'div',
		{ className: 'column is-4-tablet is-12-mobile' },
		React.createElement(
			NavLink,
			{ to: category.path },
			React.createElement(
				'div',
				{ className: 'card' },
				React.createElement(GalleryItemImage, { category: category }),
				React.createElement(
					'div',
					{ className: 'card-content' },
					React.createElement(
						'div',
						{ className: 'content' },
						React.createElement(
							'h3',
							{ className: 'title is-6' },
							category.name
						)
					)
				)
			)
		)
	);
};

const CategoryGallery = ({ categories }) => {
	const items = categories.filter(category => category.parent_id === null).map((category, index) => React.createElement(GalleryItem, { key: index, category: category }));
	return React.createElement(
		'div',
		{ className: 'columns is-multiline is-mobile' },
		items
	);
};

export default CategoryGallery;