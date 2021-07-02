const removeAll = els =>
	(els.length || els.length === 0 ? [...els] : [els]).map(el => el.remove())

const removeAllTextNodes = (els, { removeFirst = true } = {}) =>
	(els.length || els.length === 0 ? [...els] : [els]).map(el => {
		;[...el.childNodes]
			.filter(
				elm => elm.nodeType != 1 && elm.textContent.trim().length !== 0
			)
			.map(
				(elm, index) =>
					(index !== 0 || (index === 0 && removeFirst)) &&
					elm.parentNode.removeChild(elm)
			)
	})

const replaceFirstTextNode = (el, newText) => {
	let textNode = [...el.childNodes].find(
		elm => elm.nodeType != 1 && elm.textContent.trim().length !== 0
	)

	if (!textNode) {
		return
	}

	textNode.textContent = `${newText}${String.fromCharCode(160)}`
}

const renderLabel = (el, label, has_meta_label) => {
	if (!has_meta_label) {
		el.querySelector('span') && el.querySelector('span').remove()
		return
	}

	if (el.querySelector('span')) {
		el.querySelector('span').innerHTML = label
	}
}

const addDividers = ({ el, divider, tagName = 'a' }) => {
	if (el) {
		removeAllTextNodes(el)
	}

	el &&
		Array.from(el.children).map((child, index) => {
			if (index === el.children.length - 1) {
				return
			}

			if (child.tagName.toLowerCase() !== tagName.toLowerCase()) {
				return
			}

			child.insertAdjacentHTML('afterend', divider)
		})
}

const touchEl = el => {
	el.parentNode.appendChild(el)
	el.touched = true
}

export const renderSingleEntryMeta = ({
	el,
	meta_type,
	meta_divider,
	meta_elements
}) => {
	if ((meta_type || 'simple') !== 'icons') {
		removeAll(el.querySelectorAll('svg'))
	}

	el.dataset.type = `${meta_type || 'simple'}:${meta_divider || 'slash'}`

	let has_meta_label = (meta_type || 'simple') === 'label'

	if (meta_elements) {
		meta_elements.map(layer => {
			let { id, enabled, label } = layer

			if (id === 'author') {
				let { has_author_avatar, avatar_size } = layer

				if (!enabled) {
					removeAll(el.querySelectorAll('.meta-author'))
				} else {
					if (el.querySelector('.meta-author')) {
						touchEl(el.querySelector('.meta-author'))

						renderLabel(
							el.querySelector('.meta-author'),
							label,
							has_meta_label
						)

						if (has_author_avatar !== 'yes') {
							removeAll(
								el.querySelectorAll(
									'.meta-author [class*="ct-image-container"]'
								)
							)
						} else {
							const img = el.querySelector('.meta-author img')

							if (img) {
								img.height = avatar_size || '25'
								img.width = avatar_size || '25'
								img.style.height = `${avatar_size || 25}px`
							}
						}
					}
				}
			}

			if (id === 'post_date') {
				let { date_format_source, date_format, style } = layer

				if (!enabled) {
					removeAll(el.querySelectorAll('.meta-date'))
				} else {
					if (el.querySelector('.meta-date')) {
						touchEl(el.querySelector('.meta-date'))
						renderLabel(
							el.querySelector('.meta-date'),
							label,
							has_meta_label
						)
					}

					el.querySelector(
						'.meta-date .ct-meta-element-date'
					).innerHTML = window.wp.date.format(
						date_format_source === 'default'
							? el.querySelector(
									'.meta-date .ct-meta-element-date'
							  ).dataset.defaultFormat
							: date_format || 'M j, Y',
						moment(
							el.querySelector('.meta-date .ct-meta-element-date')
								.dataset.date
						)
					)
				}
			}

			if (id === 'updated_date') {
				let { date_format_source, date_format } = layer

				if (!enabled) {
					removeAll(el.querySelectorAll('.meta-updated-date'))
				} else {
					if (el.querySelector('.meta-updated-date')) {
						touchEl(el.querySelector('.meta-updated-date'))

						renderLabel(
							el.querySelector('.meta-updated-date'),
							label,
							has_meta_label
						)
					}

					el.querySelector(
						'.meta-updated-date .ct-meta-element-date'
					).innerHTML = window.wp.date.format(
						date_format_source === 'default'
							? el.querySelector(
									'.meta-updated-date .ct-meta-element-date'
							  ).dataset.defaultFormat
							: date_format || 'M j, Y',
						moment(
							el.querySelector(
								'.meta-updated-date .ct-meta-element-date'
							).dataset.date
						)
					)
				}
			}

			if (id === 'tags') {
				let { style } = layer

				let divider = ''

				if ((style || 'simple') === 'simple') {
					divider = ', '
				}

				if ((style || 'simple') === 'underline') {
					divider = ' / '
				}

				if (!enabled) {
					removeAll(el.querySelectorAll('.meta-tags'))
				} else {
					if (el.querySelector('.meta-tags')) {
						touchEl(el.querySelector('.meta-tags'))

						renderLabel(
							el.querySelector('.meta-tags'),
							label,
							has_meta_label
						)

						addDividers({
							el: el.querySelector('.meta-tags'),
							divider
						})

						if (el.querySelector('.meta-tags')) {
							el.querySelector('.meta-tags').dataset.type =
								style || 'simple'
						}
					}
				}
			}

			if (id === 'categories') {
				let { style } = layer

				let divider = ''

				if ((style || 'simple') === 'simple') {
					divider = ', '
				}

				if ((style || 'simple') === 'underline') {
					divider = ' / '
				}

				if (!enabled) {
					removeAll(el.querySelectorAll('.meta-categories'))
				} else {
					if (el.querySelector('.meta-categories')) {
						touchEl(el.querySelector('.meta-categories'))

						renderLabel(
							el.querySelector('.meta-categories'),
							label,
							has_meta_label
						)
					}

					addDividers({
						el: el.querySelector('.meta-categories'),
						divider
					})

					if (el.querySelector('.meta-categories')) {
						el.querySelector('.meta-categories').dataset.type =
							style || 'simple'
					}
				}
			}

			if (id === 'comments') {
				if (!enabled) {
					removeAll(el.querySelectorAll('.meta-comments'))
				} else {
					if (el.querySelector('.meta-comments')) {
						touchEl(el.querySelector('.meta-comments'))
					}
				}
			}
		})
	}

	Array.from(el.childNodes).map(el => {
		if (el.touched) {
			return
		}

		el.remove()
	})

	// el.removeAttribute('data-label')
	if (el.childNodes.length === 0) {
		el.remove()
	}
}
