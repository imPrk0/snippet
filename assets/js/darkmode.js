/**
 * Toggle dark mode
 * @author Prk<code@imprk.me>
 */

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    if (localStorage.getItem('__prk_dark_')) {
        const savedTheme = localStorage.getItem('__prk_dark_');
        document.documentElement.setAttribute('data-theme', savedTheme);
        if ('dark' === savedTheme) toggleSwitch.checked = true;
    } else {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
        if (prefersDarkMode) toggleSwitch.checked = true;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('__prk_dark_')) {
            document.documentElement.setAttribute('data-theme', !!e.matches ? 'dark' : 'light');
            toggleSwitch.checked = !!e.matches;
        }
    });

    toggleSwitch.addEventListener('change', function(e) {
        const _dark = !!e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', _dark);
        localStorage.setItem('theme', _dark);
    }, false);
});
