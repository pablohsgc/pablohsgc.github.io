async function loadIndexPage() {
  let REPOS_NAMES = ["E-commerce-pizzaria", "Back-End-Clinica", "Front-End-Clinica", "Front-End-Rede-Social-Good-News", "Sistema-de-doacoes-JAVA", "API_REST"];
  const REPOS_DATA = [];

  for ( let name of REPOS_NAMES ) {
    let repo = await fetch("https://api.github.com/repos/pablohsgc/" + name).then(response => response.json());
    REPOS_DATA.push(repo);
  }
  
  // Load featured repositories on the home page
  const featuredReposContainer = document.getElementById('featured-repos');
  if (featuredReposContainer) {
    REPOS_DATA.forEach(repo => {
      const card = createRepoCard(repo);
      featuredReposContainer.appendChild(card);
    });
  }
}


loadIndexPage();