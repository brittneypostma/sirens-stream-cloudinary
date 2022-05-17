import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { max } from '@cloudinary/url-gen/actions/roundCorners';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

export function get() {
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'tamas-demo'
		},
		url: {
			secure: true
		}
	});

	const img = cld.image('woman');

	img
		.resize(thumbnail().width(250).height(250).gravity(focusOn(face())))
		.roundCorners(max())
		.delivery(format('auto'))
		.delivery(quality('auto'));
	const src = img.toURL();

	return {
		body: {
			src
		}
	};
}
