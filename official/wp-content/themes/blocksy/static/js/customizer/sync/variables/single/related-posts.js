import { handleResponsiveSwitch } from '../../helpers'
export const getSingleRelatedPostsVariablesFor = () => ({
	// Related Posts
	related_visibility: [
		handleResponsiveSwitch({
			selector: '.ct-related-posts',
			on: 'grid'
		}),

		handleResponsiveSwitch({
			selector: '.ct-related-posts-container',
			on: 'block'
		})
	],

	relatedPostsContainerSpacing: {
		selector: '.ct-related-posts-container',
		variable: 'padding',
		responsive: true,
		unit: ''
	},

	relatedPostsLabelColor: {
		selector: '.ct-related-posts .ct-block-title',
		variable: 'color',
		type: 'color:default'
	},

	relatedPostsLinkColor: [
		{
			selector: '.related-entry-title',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector: '.related-entry-title',
			variable: 'colorHover',
			type: 'color:hover'
		}
	],

	relatedPostsMetaColor: [
		{
			selector: '.ct-related-posts .entry-meta',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector: '.ct-related-posts .entry-meta',
			variable: 'colorHover',
			type: 'color:hover'
		}
	],

	relatedThumbRadius: {
		selector: '.ct-related-posts .ct-image-container',
		type: 'spacing',
		variable: 'borderRadius',
		responsive: true
	},

	relatedNarrowWidth: {
		selector: '.ct-related-posts-container',
		variable: 'narrowContainer',
		unit: 'px'
	}
})
