import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { Fancybox } from '@fancyapps/ui';
import { isMobileOnly } from 'mobile-device-detect';

const handleMasonryLayout = () => {
	document.addEventListener('DOMContentLoaded', function (event) {
		const streamerGallery = document.querySelector('.streamer-gallery');
		const galleryList = document.querySelector('.streamer-gallery-list');
		const firstGalleryItem = <Element>galleryList?.querySelector('.gallery-item:first-child')

		if (isMobileOnly) {
			streamerGallery?.classList.add('is-mobile');
			streamerGallery?.appendChild(firstGalleryItem);
		}

		imagesLoaded(
			'.streamer-gallery-list',
			{ background: true },
			function (instance) {
				if (instance) {
					galleryList?.classList.add('is-loaded');
					const grid = new Masonry('.streamer-gallery-list', {
						itemSelector: '.gallery-item',
						gutter: 10,
						percentPosition: true,
						stagger: 30,
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
