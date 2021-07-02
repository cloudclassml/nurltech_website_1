import { createElement, useContext } from '@wordpress/element'
import { __ } from 'ct-i18n'
import cls from 'classnames'
import DraggableItems from './DraggableItems'
import { PanelContext } from '../../../options/components/PanelLevel'
import Row from './PlacementsBuilder/Row'

const PlacementsBuilder = ({ view, builderValueWithView }) => (
	<div
		className={cls('placements-builder', {
			'ct-mobile': view === 'mobile'
		})}>
		{view === 'mobile' && (
			<ul className="offcanvas-container">
				<Row
					direction="vertical"
					bar={builderValueWithView.find(
						({ id }) => id === 'offcanvas'
					)}
				/>
			</ul>
		)}

		<ul className="horizontal-rows">
			{['top-row', 'middle-row', 'bottom-row'].map(bar => (
				<Row
					bar={builderValueWithView.find(({ id }) => id === bar)}
					key={bar}
				/>
			))}
		</ul>
	</div>
)

export default PlacementsBuilder
