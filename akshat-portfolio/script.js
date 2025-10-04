document.addEventListener('DOMContentLoaded', () => {
    // --- TYPEWRITER EFFECT ---
    const taglineEl = document.getElementById('tagline');
    const taglineText = "A passionate developer learning through open source.";
    let i = 0;

    function typewriter() {
        if (i < taglineText.length) {
            taglineEl.innerHTML += taglineText.charAt(i);
            i++;
            setTimeout(typewriter, 50); // Adjust typing speed here (in ms)
        }
    }

    // --- DYNAMIC PROJECT LOADING ---
    async function loadProjects() {
        const projectGrid = document.getElementById('project-grid');
        try {
            const response = await fetch('./projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const projects = await response.json();

            projectGrid.innerHTML = ''; // Clear any existing content

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                
                const title = document.createElement('h3');
                title.textContent = project.title;
                
                const description = document.createElement('p');
                description.textContent = project.description;
                
                card.appendChild(title);

                // If there's a link, create an 'a' tag
                if (project.link && project.link !== '#') {
                    const link = document.createElement('a');
                    link.href = project.link;
                    link.textContent = "View Project ->";
                    link.target = "_blank";
                    card.appendChild(description);
                    card.appendChild(link);
                } else {
                    card.appendChild(description);
                }
                
                projectGrid.appendChild(card);
            });
        } catch (error) {
            console.error("Could not load projects:", error);
            projectGrid.innerHTML = '<p style="color: red;">Failed to load projects.</p>';
        }
    }

    // Start the functions
    typewriter();
    loadProjects();
});