import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { distortArc } from '@cloudinary/url-gen/actions/reshape';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { Position } from '@cloudinary/url-gen/qualifiers/position';

export function get() {
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'tamas-demo'
		},
		url: {
			secure: true
		}
	});
	const img = cld.image('demos/mug');
	img
		.overlay(
			source(
				image('demos/sirens-logo').transformation(
					new Transformation().resize(scale().width(0.97)).reshape(distortArc('-15.0'))
				)
			)
				.position(new Position().offsetX(103).offsetY(10))
				.blendMode('multiply')
		)
		.resize(scale().width(600));
	const src = img.toURL();
	return {
		body: {
			src
		}
	};
}
