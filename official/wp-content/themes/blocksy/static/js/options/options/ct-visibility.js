import { createElement, Component } from '@wordpress/element'
import { maybeTransformUnorderedChoices } from '../helpers/parse-choices.js'
import classnames from 'classnames'

const Visibility = ({ option, value, onChange }) => (
	<ul
		className="ct-visibility-option ct-devices ct-buttons-group"
		{...(option.attr || {})}>
		{maybeTransformUnorderedChoices(option.choices).map(
			({ key, value: val }) => (
				<li
					className={classnames(
						{
							active: value[key]
						},
						`ct-${key}`
					)}
					onClick={() =>
						onChange({
							...value,
							[key]: value[key]
								? Object.values(value).filter(v => v).length ===
										1 && !option.allow_empty
									? true
									: false
								: true
						})
					}
					key={key}
				/>
			)
		)}
	</ul>
)

Visibility.hiddenResponsive = true

export default Visibility
