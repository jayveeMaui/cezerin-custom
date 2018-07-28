import React from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import CategoryGallery from '../components/categoryGallery';
import CustomProducts from '../components/products/custom';
import HomeSlider from '../components/homeSlider';
const Fragment = React.Fragment;

const IndexContainer = props => {
	const { pageDetails, categories, settings } = props.state;
	const { addCartItem } = props;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		React.createElement(HomeSlider, { images: themeSettings.home_slider }),
		pageDetails.content && pageDetails.content.length > 10 && React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement('div', {
						dangerouslySetInnerHTML: {
							__html: pageDetails.content
						}
					})
				)
			)
		),
		React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'title is-4 has-text-centered' },
					themeSettings.home_products_title
				),
				React.createElement(CustomProducts, {
					sku: themeSettings.home_products_sku,
					sort: themeSettings.home_products_sort,
					limit: themeSettings.home_products_limit,
					settings: settings,
					addCartItem: addCartItem
				})
			)
		)
	);
};

export default IndexContainer;