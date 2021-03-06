import React from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import ProductFilter from '../components/productFilter';
import Sort from '../components/sort';
import CategoryBreadcrumbs from '../components/categoryBreadcrumbs';
import * as helper from '../lib/helper';
const Fragment = React.Fragment;

const getFilterAttributesSummary = productFilter => {
	let attributesSummary = '';
	if (productFilter.attributes) {
		for (const attributeKey in productFilter.attributes) {
			const attributeName = attributeKey.replace('attributes.', '');
			const attributeValue = productFilter.attributes[attributeKey];
			const attributeValueFormatted = Array.isArray(attributeValue) ? attributeValue.join(', ') : attributeValue;
			attributesSummary += `. ${attributeName}: ${attributeValueFormatted}`;
		}
	}
	return attributesSummary;
};

const getFilterPriceSummary = (productFilter, settings) => {
	let priceSummary = '';
	if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
		const priceFrom = helper.formatCurrency(productFilter.priceFrom, settings);
		const priceTo = helper.formatCurrency(productFilter.priceTo, settings);
		priceSummary = `. ${text.price}: ${priceFrom} - ${priceTo}`;
	}
	return priceSummary;
};

const CategoryHero = ({ categoryDetails, categories }) => React.createElement(
	'section',
	{ className: 'hero is-light' },
	React.createElement(
		'div',
		{ className: 'hero-body' },
		React.createElement(
			'div',
			{ className: 'container' },
			themeSettings.show_category_breadcrumbs && React.createElement(CategoryBreadcrumbs, {
				currentCategory: categoryDetails,
				categories: categories
			}),
			React.createElement(
				'h1',
				{ className: 'category-title' },
				categoryDetails.name
			),
			React.createElement('div', {
				className: 'category-description is-hidden-mobile content',
				dangerouslySetInnerHTML: { __html: categoryDetails.description }
			})
		)
	)
);

const CategoryContainer = props => {
	const {
		products,
		categoryDetails,
		settings,
		productFilter,
		productsHasMore,
		categories,
		loadingProducts,
		loadingMoreProducts
	} = props.state;
	const { setSort, addCartItem, loadMoreProducts, getJSONLD } = props;

	const filterAttributesSummary = getFilterAttributesSummary(productFilter);
	const filterPriceSummary = getFilterPriceSummary(productFilter, settings);

	const pageTitle = categoryDetails.meta_title && categoryDetails.meta_title.length > 0 ? categoryDetails.meta_title : categoryDetails.name;
	const title = `${pageTitle}${filterAttributesSummary}${filterPriceSummary}`;

	const jsonld = getJSONLD(props.state);

	const showFilter = themeSettings.show_product_filter;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: title,
			description: categoryDetails.meta_description,
			canonicalUrl: categoryDetails.url,
			imageUrl: categoryDetails.image,
			ogType: 'product.group',
			ogTitle: categoryDetails.name,
			ogDescription: categoryDetails.meta_description,
			jsonld: jsonld
		}),
		React.createElement(CategoryHero, { categoryDetails: categoryDetails, categories: categories }),
		React.createElement(
			'section',
			{ className: 'section section-category' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'columns' },
					showFilter === true && React.createElement(
						'div',
						{ className: 'column is-one-quarter left-sidebar' },
						React.createElement(ProductFilter, props)
					),
					React.createElement(
						'div',
						{ className: 'column' },
						React.createElement(
							'div',
							{ className: 'columns is-hidden-mobile' },
							React.createElement('div', { className: 'column' }),
							React.createElement(
								'div',
								{ className: 'column is-5' },
								React.createElement(Sort, {
									defaultSort: settings.default_product_sorting,
									currentSort: productFilter.sort,
									setSort: setSort
								})
							)
						),
						React.createElement(ProductList, {
							products: products,
							addCartItem: addCartItem,
							settings: settings,
							loadMoreProducts: loadMoreProducts,
							hasMore: productsHasMore,
							loadingProducts: loadingProducts,
							loadingMoreProducts: loadingMoreProducts
						})
					)
				)
			)
		)
	);
};

export default CategoryContainer;