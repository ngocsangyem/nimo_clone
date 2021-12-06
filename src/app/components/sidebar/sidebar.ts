import { isMobileOnly } from 'mobile-device-detect';

const toggleSidebar = () => {
	const sidebarBtn = document.querySelector('.sidebar-arrow');
	const sidebar = document.querySelector('.sidebar');
	const sidebarArrow = <HTMLElement>document.querySelector('.sidebar-arrow');
	const sidebarSetting = <HTMLElement>document.querySelector('.sidebar-setting');
	const sidebarInner = <HTMLElement>document.querySelector('.sidebar-inner');

	sidebarBtn?.addEventListener('click', () => {
		sidebar?.classList.toggle('is-collapse');
	});

	sidebarSetting?.addEventListener('click', () => {
		sidebarInner?.classList.toggle('is-active');
	})

	if (isMobileOnly && sidebarArrow) {
		sidebarArrow.style.display = "none";
	}
};

const SideBar = () => {
	toggleSidebar();
};

export { SideBar };
