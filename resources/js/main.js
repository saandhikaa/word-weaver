window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

async function handleRoute() {
    let route = window.location.hash.substr(1);
    if (!route) {
        route = 'home';
    }
    const currentView = await loadViewContent(`resources/views/${route}.html`);
    const contentDiv = document.querySelector('main#content');
    contentDiv.innerHTML = currentView;
}

async function loadViewContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error loading content');
        }
        return await response.text();
    } catch (error) {
        console.error(error);
        return await loadViewContent('resources/views/404.html');
    }
}
