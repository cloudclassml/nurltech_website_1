export const getAllRegularSelects = ({ includeExtra = false } = {}) =>
	[
		'.woocommerce-checkout select',
		'table.variations select',
		'.woocommerce-ordering select',
		'.widget_product_categories select',

		'.forminator-design--none select',

		'.wp-block-archives-dropdown select',
		'.wp-block-categories select',
		'.widget_categories select',
		'.widget_archive select'
	].reduce(
		(all, selector) => [...all, ...document.querySelectorAll(selector)],
		[]
	)
