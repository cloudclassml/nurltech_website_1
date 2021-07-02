import {
	createElement,
	Fragment,
	Component,
	useRef,
	useEffect,
	useState
} from '@wordpress/element'
import { registerPlugin, withPluginContext } from '@wordpress/plugins'
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post'
import { withSelect, withDispatch } from '@wordpress/data'
import { compose } from '@wordpress/compose'
import { IconButton } from '@wordpress/components'
import { handleMetaboxValueChange } from './editor/sync'

import { __ } from 'ct-i18n'

import {
	OptionsPanel,
	getValueFromInput,
	PanelLevel,
	DeviceManagerProvider
} from 'blocksy-options'

const BlocksyOptions = ({
	name,
	value,
	options,
	onChange,
	isActive,
	isPinnable = true,
	isPinned,
	togglePin,
	toggleSidebar,
	closeGeneralSidebar
}) => {
	const containerRef = useRef()
	const parentContainerRef = useRef()
	const [values, setValues] = useState(null)

	useEffect(() => {
		document.body.classList[isActive ? 'add' : 'remove'](
			'blocksy-sidebar-active'
		)
	}, [isActive])

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target="blocksy" icon="admin-customizer">
				{__('Blocksy Page Settings', 'blocksy')}
			</PluginSidebarMoreMenuItem>

			<PluginSidebar
				name={name}
				icon={
					<div className="ct-page-options-trigger">
						<svg width="20" height="20" viewBox="0 0 30 30">
							<path d="M15,0C6.7,0,0,6.7,0,15s6.7,15,15,15s15-6.7,15-15S23.3,0,15,0z M10,8.8h5.8c2.5,0,4,1.2,4,3.1c0,1.3-1,2.5-2.3,2.7v0.2c1.6,0.1,2.9,1.4,2.9,3c0,2.2-1.7,3.6-4.4,3.6h-6V8.8z M13.2,11v2.8h1.7c1.2,0,1.8-0.5,1.8-1.4c0-0.9-0.6-1.4-1.7-1.4H13.2zM13.2,15.8V19h1.9c1.3,0,2-0.6,2-1.6c0-1-0.7-1.6-2.1-1.6H13.2z" />
						</svg>
					</div>
				}
				className="ct-components-panel"
				title={__('Blocksy Page Settings', 'blocksy')}>
				<div id="ct-page-options" ref={parentContainerRef}>
					<div className="ct-options-container" ref={containerRef}>
						<DeviceManagerProvider>
							<PanelLevel
								containerRef={containerRef}
								parentContainerRef={parentContainerRef}
								useRefsAsWrappers>
								<div className="ct-panel-options-header components-panel__header edit-post-sidebar-header">
									<strong>
										{__('Blocksy Page Settings', 'blocksy')}
									</strong>

									{isPinnable && (
										<IconButton
											icon={
												isPinned
													? 'star-filled'
													: 'star-empty'
											}
											label={
												isPinned
													? __(
															'Unpin from toolbar',
															'blocksy'
													  )
													: __(
															'Pin to toolbar',
															'blocksy'
													  )
											}
											onClick={togglePin}
											isPressed={isPinned}
											aria-expanded={isPinned}
										/>
									)}

									<IconButton
										onClick={closeGeneralSidebar}
										icon="no-alt"
										label={__('Close plugin', 'blocksy')}
									/>
								</div>
								<OptionsPanel
									onChange={(key, v) => {
										const futureValue = {
											...(values ||
												getValueFromInput(
													options,
													value || {}
												)),
											[key]: v
										}

										handleMetaboxValueChange(key, v)

										onChange(futureValue)
										setValues(futureValue)
									}}
									value={
										values ||
										getValueFromInput(options, value || {})
									}
									options={options}
								/>
							</PanelLevel>
						</DeviceManagerProvider>
					</div>
				</div>
			</PluginSidebar>
		</Fragment>
	)
}

const BlocksyOptionsComposed = compose(
	withPluginContext((context, { name }) => ({
		sidebarName: `${context.name}/${name}`
	})),

	withSelect((select, { sidebarName }) => {
		const value = select('core/editor').getEditedPostAttribute(
			'blocksy_meta'
		)

		const { getActiveGeneralSidebarName, isPluginItemPinned } = select(
			'core/edit-post'
		)

		return {
			isActive: getActiveGeneralSidebarName() === sidebarName,
			isPinned: isPluginItemPinned(sidebarName),
			value: Array.isArray(value) ? {} : value || {},
			options: ct_editor_localizations.post_options
		}
	}),
	withDispatch((dispatch, { sidebarName }) => {
		const {
			closeGeneralSidebar,
			openGeneralSidebar,
			togglePinnedPluginItem
		} = dispatch('core/edit-post')

		return {
			closeGeneralSidebar,
			togglePin: () => {
				togglePinnedPluginItem(sidebarName)
			},

			onChange: blocksy_meta => {
				dispatch('core/editor').editPost({
					blocksy_meta
				})
			}
		}
	})
)(BlocksyOptions)

if (ct_editor_localizations.post_options) {
	registerPlugin('blocksy', {
		render: () => <BlocksyOptionsComposed name="blocksy" />
	})
}
