function generateHeadingIds() {
    var contentContainer = document.getElementById('content');
    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    generateHeadingIds();
});