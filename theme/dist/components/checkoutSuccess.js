import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';
import * as helper from '../lib/helper';

const getCheckoutField = (checkoutFields, fieldName) => {
	if (checkoutFields && checkoutFields.length > 0) {
		return checkoutFields.find(f => f.name === fieldName && f.status !== 'hidden');
	} else {
		return null;
	}
};

const MobileField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'mobile');
	return checkoutField && order.mobile !== '' ? React.createElement(ShippingFieldDiv, {
		label: helper.getCheckoutFieldLabel(checkoutField),
		value: order.mobile
	}) : null;
};

const CityField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'city');
	return checkoutField && order.shipping_address.city !== '' ? React.createElement(ShippingFieldDiv, {
		label: helper.getCheckoutFieldLabel(checkoutField),
		value: order.shipping_address.city
	}) : null;
};

const CommentsField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'comments');
	return checkoutField && order.comments !== '' ? React.createElement(ShippingFieldDiv, {
		label: helper.getCheckoutFieldLabel(checkoutField),
		value: order.comments
	}) : null;
};

const ShippingFields = ({ order, shippingMethod }) => {
	let shippingFields = null;
	if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
		shippingFields = shippingMethod.fields.map((field, index) => {
			const fieldLabel = helper.getShippingFieldLabel(field);
			const fieldValue = order.shipping_address[field.key];

			return React.createElement(ShippingFieldDiv, { key: index, label: fieldLabel, value: fieldValue });
		});
	}

	return React.createElement(
		'div',
		null,
		shippingFields
	);
};

const ShippingFieldDiv = ({ label, value }) => React.createElement(
	'div',
	{ className: 'shipping-field' },
	React.createElement(
		'label',
		null,
		label,
		': '
	),
	value
);

const OrderItem = ({ item, settings }) => React.createElement(
	'div',
	{ className: 'columns is-mobile is-gapless checkout-success-row' },
	React.createElement(
		'div',
		{ className: 'column is-6' },
		item.name,
		React.createElement('br', null),
		React.createElement(
			'span',
			null,
			item.variant_name
		)
	),
	React.createElement(
		'div',
		{ className: 'column is-2 has-text-right' },
		helper.formatCurrency(item.price, settings)
	),
	React.createElement(
		'div',
		{ className: 'column is-2 has-text-centered' },
		item.quantity
	),
	React.createElement(
		'div',
		{ className: 'column is-2 has-text-right' },
		helper.formatCurrency(item.price_total, settings)
	)
);

const OrderItems = ({ items, settings }) => {
	if (items && items.length > 0) {
		const rows = items.map((item, index) => React.createElement(OrderItem, { key: index, item: item, settings: settings }));
		return React.createElement(
			'div',
			null,
			rows
		);
	} else {
		return null;
	}
};

const CheckoutSuccess = ({
	order,
	settings,
	pageDetails,
	shippingMethod,
	checkoutFields
}) => {
	if (order && order.items && order.items.length > 0) {
		return React.createElement(
			'div',
			{ className: 'checkout-success-details' },
			React.createElement(
				'h1',
				{ className: 'checkout-success-title' },
				React.createElement('img', { src: '/assets/images/success.svg' }),
				React.createElement('br', null),
				text.checkoutSuccessTitle
			),
			React.createElement('div', {
				dangerouslySetInnerHTML: {
					__html: pageDetails.content
				}
			}),
			React.createElement('hr', null),
			React.createElement(
				'div',
				{ className: 'columns', style: { marginBottom: '3rem' } },
				React.createElement(
					'div',
					{ className: 'column is-6' },
					React.createElement(
						'b',
						null,
						text.shipping
					),
					React.createElement(MobileField, { order: order, checkoutFields: checkoutFields }),
					React.createElement(CityField, { order: order, checkoutFields: checkoutFields }),
					React.createElement(ShippingFields, { order: order, shippingMethod: shippingMethod }),
					React.createElement(CommentsField, { order: order, checkoutFields: checkoutFields })
				),
				React.createElement(
					'div',
					{ className: 'column is-6' },
					React.createElement(
						'b',
						null,
						text.orderNumber
					),
					': ',
					order.number,
					React.createElement('br', null),
					React.createElement(
						'b',
						null,
						text.shippingMethod
					),
					': ',
					order.shipping_method,
					React.createElement('br', null),
					React.createElement(
						'b',
						null,
						text.paymentMethod
					),
					': ',
					order.payment_method,
					React.createElement('br', null)
				)
			),
			React.createElement(
				'div',
				{ className: 'columns is-mobile is-gapless checkout-success-row' },
				React.createElement(
					'div',
					{ className: 'column is-6' },
					React.createElement(
						'b',
						null,
						text.productName
					)
				),
				React.createElement(
					'div',
					{ className: 'column is-2 has-text-right' },
					React.createElement(
						'b',
						null,
						text.price
					)
				),
				React.createElement(
					'div',
					{ className: 'column is-2 has-text-centered' },
					React.createElement(
						'b',
						null,
						text.qty
					)
				),
				React.createElement(
					'div',
					{ className: 'column is-2 has-text-right' },
					React.createElement(
						'b',
						null,
						text.total
					)
				)
			),
			React.createElement(OrderItems, { items: order.items, settings: settings }),
			React.createElement(
				'div',
				{ className: 'columns' },
				React.createElement(
					'div',
					{ className: 'column is-offset-7 checkout-success-totals' },
					React.createElement(
						'div',
						null,
						React.createElement(
							'span',
							null,
							text.subtotal,
							':'
						),
						React.createElement(
							'span',
							null,
							helper.formatCurrency(order.subtotal, settings)
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement(
							'span',
							null,
							text.shipping,
							':'
						),
						React.createElement(
							'span',
							null,
							helper.formatCurrency(order.shipping_total, settings)
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement(
							'b',
							null,
							text.grandTotal,
							':'
						),
						React.createElement(
							'b',
							null,
							helper.formatCurrency(order.grand_total, settings)
						)
					)
				)
			)
		);
	} else {
		return React.createElement(
			'div',
			{ className: 'has-text-centered' },
			text.cartEmpty
		);
	}
};

export default CheckoutSuccess;