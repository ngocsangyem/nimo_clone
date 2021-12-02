const SideBar = () => {
	const sidebarBtn = document.querySelector('.sidebar-arrow');
	const sidebar = document.querySelector('.sidebar');

	sidebarBtn?.addEventListener('click', () => {
		sidebar?.classList.toggle('is-collapse');
	})
};

export { SideBar };
