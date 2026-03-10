/*************************************
 * Dark Mode Toggle Web Component JS *
 *************************************/

/*
* Define a custom element <theme-toggle>
* This wraps the theme toggle logic in a reusable component
*/
customElements.define(
  'theme-toggle',
  class extends HTMLElement {

  /*
  * Private instance fields
  * These hold references and state for this component instance
  */

  /** Button inside the component that triggers the toggle */
  /** @type HTMLButtonElement | null */ #btn;

  /** Current theme state for this component */
  /** @type {'light' | 'dark'} */ #theme = 'light';

  /** Media query object used to watch system theme preference */
  /** @type {MediaQueryList | null} */ #media;

  // Runs automatically when the component is inserted into the DOM
  // We wait for the DOM to be ready so querySelector() works reliably
  connectedCallback() {
  if (document.readyState !== 'loading') {
    this.init();
    return;
  }
  document.addEventListener('DOMContentLoaded', () => this.init(), {
    once: true,
  });
}

/* 
 * Initialize the component
 * This is where we grab elements, restore state, and attach listeners
 */
  init() {
  // Find the button inside the component
  this.#btn = this.querySelector('button');

  // If the component doesn't contain a button, warn and bail
  if (!this.#btn) {
    console.warn(this, 'A button is required');
    return;
  }
  // Listen for click events on the button
  // Using handleEvent() so this component can manage multiple events cleanly
  this.#btn.addEventListener('click', this);

  // Check if the user previously chose a theme
  const storedTheme = localStorage.getItem('theme');

  // If we have a stored preference, respect it
  if (storedTheme === 'light' || storedTheme === 'dark') {
    this.#theme = storedTheme;
  } else {
    // Otherwise fall back to the system theme preference

    // Create a media query watcher for prefers-color-scheme
    this.#media = window.matchMedia('(prefers-color-scheme: dark)');

    // Set the initial theme based on the system setting
    this.#theme = this.#media.matches ? 'dark' : 'light';
    // Listen for system theme changes so we can update live
    // (only applies when the user hasn't manually chosen a theme)
    this.#media.addEventListener('change', this);
  }

  // Render the UI to match the current state
  this.render ();
  }

  /*
   * Cleanup when the component is removed from the DOM
   * Important for global listeners so we don't leak memory
   */
  disconnectedCallback() {

    // Remove the button click listener
    if (this.#btn) {
      this.#btn.removeEventListener('click', this);
    }

    // Remove the system theme listener
    if (this.#media) {
    this.#media.removeEventListener('change', this);
    }
  }

  /* Central event handler
   * Using handleEvent() lets us pass "this" as the listener
   * and route multiple event types in one place
   */
  handleEvent(event) {

    // User clicked the toggle button
      if (event.type === 'click') {
      this.toggleTheme();
    }

      // System color scheme changed
      if (event.type === 'change') {
      this.onSystemThemeChange(event);
    }
  }

  // Runs when the OS theme preference changes
  onSystemThemeChange(event) {
    // If the user has explicitly chosen a theme,
    // ignore system changes
    if (localStorage.getItem('theme')) return;

    // Update internal state based on system preference
    this.#theme = event.matches ? 'dark' : 'light';

    // Update the UI
    this.render();
  }

  // Toggle between light and dark themes
  // This is triggered when the button is clicked
  toggleTheme() {

    // Flip the current theme
    this.#theme = this.#theme === 'light' ? 'dark' : 'light';

    // Persist the user's preference
    localStorage.setItem('theme', this.#theme);

    // Update the UI and document state
    this.render();
  }

  // Sync the UI and document with the current theme state
  render() {
    // Apply the theme to the document root
    // CSS can then respond via [data-theme]
    document.documentElement.dataset.theme = this.#theme;

    /* Update the button's accessibility state
     * aria-checked communicates whether dark mode is active
     * I chose aria-checked based on Heydon's deisgn https://inclusive-components.design/toggle-button/
     * aria-pressed may be more appropriate for other designs
     */
    if (this.#btn) {
      this.#btn.setAttribute(
        'aria-checked',
        String(this.#theme === 'dark')
      )
    }
  }
});