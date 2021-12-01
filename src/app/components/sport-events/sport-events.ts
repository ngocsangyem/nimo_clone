import Swiper, { Navigation, Pagination } from 'swiper';

const handleRecommendedSlides = () => {
	Swiper.use([Navigation, Pagination]);
	const swiper = new Swiper('.recommended-slides', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.recommended-title .swiper-button-next',
			prevEl: '.recommended-title .swiper-button-prev',
		},
		pagination: {
			el: '.recommended-slides .swiper-pagination',
			type: 'bullets',
		},
		autoplay: {
			delay: 3000,
		},
		loop: true,
	});
};

const handleEsportsEventsSlides = () => {
	Swiper.use([Navigation, Pagination]);
	const swiper = new Swiper('.event-schedules', {
		slidesPerView: 1,
		spaceBetween: 10,
		navigation: {
			nextEl: '.esports-events-title .swiper-button-next',
			prevEl: '.esports-events-title .swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 320px
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			// when window width is >= 480px
			768: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
			// when window width is >= 640px
			2000: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
		},
		loop: true,
	});
};

const SportEvents = () => {
	handleRecommendedSlides();
	handleEsportsEventsSlides();
};

export { SportEvents };
