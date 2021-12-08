const navItems = document.querySelectorAll(
	'.streaming-banner .streaming-list .item-content'
);

const handleTab = () => {
	Array.from(navItems).forEach((navItem) => {
		navItem?.addEventListener('click', () => {
			Array.from(navItems).forEach((item) =>
				item?.classList.remove('is-active')
			);
			navItem.classList.add('is-active');
		});
	});
};

const StreamingBanner = () => {
	handleTab();
};

export { StreamingBanner };
