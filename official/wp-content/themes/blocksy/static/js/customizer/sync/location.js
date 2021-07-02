import $ from 'jquery'

const sendLocation = () => {
	wp.customize.selectiveRefresh.bind('partial-content-rendered', e => {
		ctEvents.trigger('blocksy:instagram:init')
		ctEvents.trigger('ct:images:lazyload:update')
		ctEvents.trigger('ct:custom-select:init')
		ctEvents.trigger('ct:trending-block:mount')

		setTimeout(() => {
			ctEvents.trigger('ct:images:lazyload:update')
		}, 500)

		setTimeout(() => {
			ctEvents.trigger('ct:images:lazyload:update')
		}, 2000)
	})
}

wp.customize.bind('ready', () => sendLocation())
wp.customize.bind('preview-ready', () => sendLocation())
