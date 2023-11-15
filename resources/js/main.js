
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
