import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { Fancybox } from '@fancyapps/ui';

const handleMasonryLayout = () => {
	document.addEventListener('DOMContentLoaded', function (event) {
		const galleryItems = document.querySelectorAll('.gallery-item');
		const galleryList = document.querySelector('.streamer-gallery-list');

		imagesLoaded(
			'.streamer-gallery-list',
			{ background: true },
			function (instance) {
				if (instance) {
					galleryList?.classList.add('is-loaded');
					const grid = new Masonry('.streamer-gallery-list', {
						itemSelector: '.gallery-item',
						// columnWidth: '.gallery-item-col-sizer',
						gutter: 10,
						// percentPosition: true,
						// stagger: 30,
						// nicer reveal transition
						visibleStyle: {
							transform: 'translateY(0)',
							opacity: 1,
						},
						hiddenStyle: {
							transform: 'translateY(100px)',
							opacity: 0,
						},
					});
				}
			}
		);
		Fancybox.bind('[data-fancybox]', {
			Image: {
				zoom: false,
			},
		});
	});
};

const StreamerGallery = () => {
	handleMasonryLayout();
};

export { StreamerGallery };
