import React from 'react';
import Helmet from 'react-helmet';

const MetaTags = ({
	title,
	description,
	canonicalUrl,
	imageUrl,
	ogType,
	ogTitle,
	ogDescription,
	jsonld
}) => {
	let metaArray = [];
	let linkArray = [];

	if (description && description.length > 0) {
		metaArray.push({
			name: 'description',
			content: description
		});
	}

	if (canonicalUrl && canonicalUrl.length > 0) {
		linkArray.push({
			rel: 'canonical',
			href: canonicalUrl
		});

		metaArray.push({
			property: 'og:url',
			content: canonicalUrl
		});
	}

	if (imageUrl && imageUrl.length > 0) {
		metaArray.push({
			property: 'og:image',
			content: imageUrl
		});

		linkArray.push({
			rel: 'image_src',
			href: imageUrl
		});
	}

	if (ogType && ogType.length > 0) {
		metaArray.push({
			property: 'og:type',
			content: ogType
		});
	}

	if (ogTitle && ogTitle.length > 0) {
		metaArray.push({
			property: 'og:title',
			content: ogTitle
		});
	}

	if (ogDescription && ogDescription.length > 0) {
		metaArray.push({
			property: 'og:description',
			content: ogDescription
		});
	}

	const scriptJSONLD = jsonld && jsonld.length > 0 ? React.createElement(
		'script',
		{ type: 'application/ld+json' },
		jsonld
	) : null;

	return React.createElement(
		Helmet,
		{ title: title, meta: metaArray, link: linkArray },
		scriptJSONLD
	);
};

export default MetaTags;