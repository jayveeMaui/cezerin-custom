import React from 'react';
import { themeSettings, text } from '../lib/settings';

const Sort = ({ defaultSort, currentSort, setSort }) => {
	return React.createElement(
		'div',
		{ className: 'columns is-mobile sort' },
		React.createElement(
			'div',
			{ className: 'column is-4 sort-title' },
			text.sort,
			':'
		),
		React.createElement(
			'div',
			{ className: 'column' },
			React.createElement(
				'span',
				{ className: 'select is-fullwidth' },
				React.createElement(
					'select',
					{
						onChange: e => {
							setSort(e.target.value);
						},
						value: currentSort
					},
					React.createElement(
						'option',
						{ value: defaultSort },
						text.sortFavorite
					),
					React.createElement(
						'option',
						{ value: themeSettings.sortNewest },
						text.sortNewest
					),
					React.createElement(
						'option',
						{ value: themeSettings.sortPriceLow },
						text.sortPriceLow
					),
					React.createElement(
						'option',
						{ value: themeSettings.sortPriceHigh },
						text.sortPriceHigh
					)
				)
			)
		)
	);
};

export default Sort;