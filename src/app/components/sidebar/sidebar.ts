import { isMobile } from 'mobile-device-detect';

const toggleSidebar = () => {
	const sidebarBtn = document.querySelector('.sidebar-arrow');
	const sidebar = document.querySelector('.sidebar');
	const sidebarArrow = <HTMLElement>document.querySelector('.sidebar-arrow');

	sidebarBtn?.addEventListener('click', () => {
		sidebar?.classList.toggle('is-collapse');
	});

	if (isMobile) {
		sidebarArrow.style.display = "none";
	}
};

const SideBar = () => {
	toggleSidebar();
};

export { SideBar };
