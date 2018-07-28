import React from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import PageList from '../components/pageList';
const Fragment = React.Fragment;

const PageContainer = props => {
	const { pageDetails, currentPage } = props.state;
	const pageListTag = themeSettings.page_list_tag;
	const pageListTagDefined = pageListTag && pageListTag.length > 0;
	const pageListPath = pageListTagDefined ? '/' + pageListTag : null;
	const showPageList = pageListTagDefined && pageDetails.path === pageListPath;

	return React.createElement(
		Fragment,
		null,
		React.createElement(MetaTags, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogType: 'article',
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		React.createElement(
			'section',
			{ className: 'section' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement('div', {
						className: 'page-content',
						dangerouslySetInnerHTML: {
							__html: pageDetails.content
						}
					}),
					showPageList && React.createElement(PageList, { tags: pageListTag, sort: '-date_created' })
				)
			)
		)
	);
};

export default PageContainer;