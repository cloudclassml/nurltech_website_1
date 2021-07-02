import { enable, disable } from './no-bounce'

const showOffcanvas = settings => {
	settings = {
		onClose: () => {},
		container: null,
		focus: true,
		...settings
	}

	if (settings.container) {
		settings.container.classList.add('active')
	}

	if (settings.focus) {
		setTimeout(() => {
			settings.container.querySelector('input') &&
				settings.container.querySelector('input').focus()
		}, 200)
	}

	settings.container
		.querySelector('.content-container')
		.firstElementChild.addEventListener('click', event => {
			Array.from(settings.container.querySelectorAll('select')).map(
				select => select.selectr && select.selectr.events.dismiss(event)
			)
		})

	if (settings.clickOutside) {
		settings.container
			.querySelector('.content-container')
			.addEventListener('click', event => {
				if (
					settings.container.querySelector('.content-container') !==
						event.target &&
					settings.container
						.querySelector('.content-container')
						.contains(event.target)
				) {
					return
				}
				document.body.hasAttribute('data-panel') &&
					hideOffcanvas(settings)
			})
	}

	document.body.dataset.panel = `in${
		settings.container.dataset.behaviour.indexOf('left') > -1
			? ':left'
			: settings.container.dataset.behaviour.indexOf('right') > -1
			? ':right'
			: ''
	}`

	settings.container.addEventListener(
		settings.container.dataset.behaviour.indexOf('side') > -1
			? 'transitionend'
			: 'animationend',
		() => {
			return
			document.body.dataset.panel = `${
				settings.container.dataset.behaviour.indexOf('left') > -1
					? 'left'
					: settings.container.dataset.behaviour.indexOf('right') > -1
					? 'right'
					: ''
			}`
		},
		{ once: true }
	)

	document.addEventListener(
		'keyup',
		event => {
			const { keyCode, target } = event
			if (keyCode !== 27) return
			event.preventDefault()

			document.body.hasAttribute('data-panel') && hideOffcanvas(settings)
		},
		{ once: true }
	)

	settings.container &&
		settings.container.querySelector('.close-button').addEventListener(
			'click',
			event => {
				event.preventDefault()

				hideOffcanvas(settings)
			},
			{ once: true }
		)

	disable(settings.container.querySelector('.content-container'))

	/**
	 * Add window event listener in the next frame. This allows us to freely
	 * propagate the current clck event up the chain -- without the modal
	 * getting closed.
	 */
	requestAnimationFrame(() =>
		window.addEventListener('click', settings.handleWindowClick)
	)
}

const hideOffcanvas = settings => {
	settings = {
		onClose: () => {},
		container: null,
		...settings
	}

	if (!document.body.hasAttribute('data-panel')) {
		settings.container.classList.remove('active')
		settings.onClose()
		return
	}

	settings.container.classList.remove('active')

	document.body.dataset.panel = `out`

	settings.container.addEventListener(
		'transitionend',
		() => {
			setTimeout(() => {
				document.body.removeAttribute('data-panel')
				ctEvents.trigger('ct:modal:closed', settings.container)
				enable(settings.container.querySelector('.content-container'))
			}, 300)
		},
		{ once: true }
	)

	const onEnd = event => {
		const { keyCode, target } = event
		if (keyCode !== 27) return
		event.preventDefault()
		document.removeEventListener('keyup', onEnd)
		closeModal(id, settings)
	}

	window.removeEventListener('click', settings.handleWindowClick)

	settings.onClose()
}

export const handleClick = (e, settings) => {
	e.preventDefault()

	settings = {
		onClose: () => {},
		container: null,
		focus: true,
		clickOutside: false,
		isModal: false,
		handleWindowClick: e => {
			if (settings.container.contains(e.target)) {
				return
			}

			document.body.hasAttribute('data-panel') && hideOffcanvas(settings)
		},
		...settings
	}

	if (document.body.hasAttribute('data-panel')) {
		if (
			settings.isModal &&
			!settings.container.classList.contains('active')
		) {
			const menuToggle = document.querySelector('.ct-header-trigger')

			if (menuToggle) {
				menuToggle.click()
			}

			setTimeout(() => {
				showOffcanvas(settings)
			}, 450)
		} else {
			hideOffcanvas(settings)
		}
	} else {
		showOffcanvas(settings)
	}
}

ctEvents.on('ct:offcanvas:force-close', settings => hideOffcanvas(settings))

export const mount = el => {
	if (el.hasSearchEventListener) {
		return
	}

	el.hasSearchEventListener = true

	el.addEventListener('click', event => {
		handleClick(event, {
			isModal: true,
			container: document.querySelector(el.hash)
		})
	})
}
