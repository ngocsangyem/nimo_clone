import Swiper, { Navigation, Pagination } from 'swiper';

const topGamesSLider = () => {
	Swiper.use([Navigation, Pagination]);
	const swiper = new Swiper('.top-game .swiper', {
		slidesPerView: 2,
		spaceBetween: 20,
		freeMode: true,
		autoHeight: true,
		navigation: {
			nextEl: '.top-game .swiper-button-next',
			prevEl: '.top-game .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
			},
			1400: {
				slidesPerView: 'auto',
			},
		},
	});
};

const TopGames = () => {
	topGamesSLider();
};

export { TopGames };
