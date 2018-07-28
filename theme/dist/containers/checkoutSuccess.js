import React from 'react';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';
import MetaTags from '../components/metaTags';
import CheckoutSuccess from '../components/checkoutSuccess';
const Fragment = React.Fragment;

const CheckoutSuccessContainer = props => {
	const {
		pageDetails,
		order,
		settings,
		shippingMethods,
		checkoutFields
	} = props.state;
	const shippingMethod = helper.getShippingMethodFromOrder(order, shippingMethods);

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
		React.createElement(
			'section',
			{ className: 'section section-checkout' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'columns content' },
					React.createElement(
						'div',
						{ className: 'column is-8 is-offset-2' },
						React.createElement(
							'div',
							{ className: 'checkout-box' },
							React.createElement(CheckoutSuccess, {
								order: order,
								settings: settings,
								pageDetails: pageDetails,
								shippingMethod: shippingMethod,
								checkoutFields: checkoutFields
							})
						)
					)
				)
			)
		)
	);
};

export default CheckoutSuccessContainer;