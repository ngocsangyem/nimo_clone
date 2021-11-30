const settingPanel = document.querySelector('.setting-panel');
const panelList = settingPanel?.querySelector('.panel-list');
const settingPanelBtn = document.querySelector('.header-btn-setting');
const panelContentItems = document.querySelectorAll(
	'.panel-content .panel-content-item[data-panel]'
);
const settingMask = document.querySelector('.setting-mask');

const toggleSettingPanel = () => {
	const handleToggle = () => {
		settingPanel?.classList.toggle('is-active');
		settingMask?.classList.toggle('is-active');
		togglePanelList();
		Array.from(panelContentItems).forEach((panel) =>
			panel?.classList.remove('is-active')
		);
	}
	settingPanelBtn?.addEventListener('click', handleToggle);
	settingMask?.addEventListener('click', handleToggle)
};

const closePanelList = () => {
	if (!panelList?.classList.contains('is-hidden')) {
		panelList?.classList.add('is-hidden');
	}
};

const togglePanelList = () => {
	if (panelList?.classList.contains('is-hidden')) {
		panelList?.classList.remove('is-hidden');
	}
};

const openPanelContent = () => {
	Array.from(panelContentItems).forEach((panel) => {
		const panelButton = document.querySelector(
			`.panel-item[data-panel='${panel.getAttribute('data-panel')}']`
		);
		const panelTrigger = panel.querySelector('.panel-trigger');

		panelButton?.addEventListener('click', () => {
			closePanelList();
			panel?.classList.add('is-active');
		});

		panelTrigger?.addEventListener('click', () => {
			panel?.classList.remove('is-active');
			togglePanelList();
		});
	});
};

const Header = () => {
	toggleSettingPanel();
	openPanelContent();
};

export { Header };
