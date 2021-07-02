import { watchOptionsWithPrefix } from '../../helpers'
import { replaceCards } from '../archive-product'

watchOptionsWithPrefix({
	getOptionsForPrefix: () => ['shop_structure', 'shop_columns'],
	render: () => {
		;[...document.querySelectorAll('.shop-entries')].map(el => {
			const structure = wp.customize('shop_structure')()

			el.dataset.layout = structure

			if (structure === 'grid') {
				el.dataset.columns = wp.customize('shop_columns')()
			} else {
				el.removeAttribute('data-columns')
			}
		})

		replaceCards()
	}
})
