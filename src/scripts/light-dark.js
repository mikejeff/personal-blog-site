// Get a MediaQueryList object for the 'prefers-color-scheme: dark' media query
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
// Get theme toggle button
const themeToggle = document.getElementById('theme-toggle');
// Define a function to handle changes in the dark mode preference
function handleDarkModeChange(event) {
	if (event.matches || document.documentElement.dataset.theme) {
		// User prefers dark mode
		themeToggle.innerHTML = '🌞';
		document.documentElement.dataset.theme = 'dark';
		console.log("user prefers dark mode")
	} else {
		// User prefers dark mode
		themeToggle.innerHTML = '🌙';
		document.documentElement.dataset.theme = 'light';
		console.log("user prefers light mode")
	}
}

// Add an event listener to the MediaQueryList to listen for 'change' events
darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

// Call the handler once on page load to set the initial state
handleDarkModeChange(darkModeMediaQuery);

function toggleTheme() {
	document.documentElement.dataset.theme =
		(document.documentElement.dataset.theme === "dark") ? "light" : "dark";

	if (document.documentElement.dataset.theme === "dark") {
		themeToggle.innerHTML = '🌞';
	} else {
		themeToggle.innerHTML = '🌙';
	};
}

themeToggle.addEventListener('click', toggleTheme);