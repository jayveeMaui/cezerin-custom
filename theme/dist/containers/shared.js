import React from 'react';
import { themeSettings, text } from '../lib/settings';
import Header from '../components/header';
import Footer from '../components/footer';
const Fragment = React.Fragment;

const SharedContainer = props => {
	const { currentPage, settings } = props.state;
	let hideFooter = (currentPage.path === '/checkout-success' || currentPage.path === '/checkout') && themeSettings.hide_footer_on_checkout === true;

	return React.createElement(
		Fragment,
		null,
		React.createElement(Header, props),
		props.children,
		!hideFooter && React.createElement(Footer, { settings: settings })
	);
};

export default SharedContainer;