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



function Scanning(){}
const scan = new Scanning();

document.body.addEventListener('click', element => {
    const classes = element.target.className.split(' ');
    
    classes.forEach(className => {
        if (className in scan) {
            scan[className](element.target);
        }
    });
    
    element.stopPropagation();
});



Scanning.prototype.openNav = element => {
    const closeSVG = `<svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50 50"><g fill="none" stroke="#000" stroke-width="3"><path d="M15 15 L35 35 M35 15 L15 35"/></g></svg>`;
    element.innerHTML = closeSVG;
    element.classList.remove('openNav');
    element.classList.add('closeNav');
    
    const navList = document.querySelector('#nav-list');
    navList.classList.remove('-top-[100%]');
    navList.classList.add('top-10');
};

Scanning.prototype.closeNav = element => {
    const menuSVG = `<svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50 50"><g fill="none" stroke="#000" stroke-width="3"><path d="M10 15h30M10 25h30M10 35h30"/></g></svg>`;
    element.innerHTML = menuSVG;
    element.classList.remove('closeNav');
    element.classList.add('openNav');
    
    const navList = document.querySelector('#nav-list');
    navList.classList.remove('top-10');
    navList.classList.add('-top-[100%]');
};