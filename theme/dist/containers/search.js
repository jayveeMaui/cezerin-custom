import React from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
const Fragment = React.Fragment;

const CategoryContainer = props => {
	const {
		products,
		settings,
		productFilter,
		productsHasMore,
		productsMinPrice,
		productsMaxPrice,
		productsTotalCount
	} = props.state;
	const {
		setSearch,
		setSort,
		setPriceFromAndTo,
		addCartItem,
		loadMoreProducts
	} = props;
	const searchNotEmpty = productFilter.search && productFilter.search !== '';
	const searchDescription = searchNotEmpty ? `${text.resultsFor} "${productFilter.search}"` : text.search;
	const title = searchNotEmpty ? `${productFilter.search} - ${text.search}` : text.search;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, { title: title }),
		React.createElement(
			'section',
			{ className: 'hero is-light' },
			React.createElement(
				'div',
				{ className: 'hero-body' },
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'h1',
						{ className: 'title is-4' },
						searchDescription
					)
				)
			)
		),
		React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(ProductList, {
					products: products,
					addCartItem: addCartItem,
					settings: settings,
					loadMoreProducts: loadMoreProducts,
					hasMore: productsHasMore
				})
			)
		)
	);
};

export default CategoryContainer;