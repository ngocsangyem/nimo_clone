import Swiper, { Navigation, Pagination } from 'swiper';

const handleSlides = () => {
	Swiper.use([Navigation, Pagination]);
	const swiper = new Swiper('.pro-team .pro-team-slides.swiper', {
		slidesPerView: 2,
		spaceBetween: 50,
		freeMode: true,
		autoHeight: true,
		navigation: {
			nextEl: '.pro-team .swiper-button-next',
			prevEl: '.pro-team .swiper-button-prev',
		},
		breakpoints: {
			1300: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1700: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		loop: true
	});
}

const ProTeam = () => {
	handleSlides();
};

export { ProTeam };
