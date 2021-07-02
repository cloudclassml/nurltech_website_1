import { handleBackgroundOptionFor } from '../background'

export const getSingleContentVariablesFor = ({ post_type }) => {
	let global_selector = post_type

	if (post_type !== 'page' && post_type !== 'bbpress') {
		global_selector = `single-${post_type}`
	}

	return {
		...handleBackgroundOptionFor({
			id: `${post_type}_background`,
			selector: `body.${global_selector}`
		}),

		...handleBackgroundOptionFor({
			id: `${post_type}_content_background`,
			selector: `.${post_type}[data-structure*="boxed"]`
		}),

		...handleBackgroundOptionFor({
			id: `${post_type}_content_background`,
			selector: `.${post_type}[data-structure*="boxed"]`
		}),

		[`${post_type}ContentBoxedSpacing`]: {
			selector: `.${post_type}[data-structure*="boxed"]`,
			variable: 'contentBoxedSpacing',
			responsive: true,
			unit: ''
		},

		[`${post_type}ContentBoxedRadius`]: {
			selector: `.${post_type}[data-structure*="boxed"]`,
			type: 'spacing',
			variable: 'borderRadius',
			responsive: true
		},

		[`${post_type}ContentBoxedShadow`]: {
			selector: `.${post_type}[data-structure*="boxed"]`,
			type: 'box-shadow',
			variable: 'boxShadow',
			responsive: true
		}
	}
}
