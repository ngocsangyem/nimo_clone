import Swiper, { Navigation, Pagination } from 'swiper';
const filterNavigation = () => {
	Swiper.use([Navigation, Pagination]);
	const swiper = new Swiper('.filter-navigation .swiper', {
		slidesPerView: 2,
		spaceBetween: 20,
		freeMode: true,
		autoHeight: true,
	});
};

export { filterNavigation };

