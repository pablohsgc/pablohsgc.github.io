function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card animate-fade-in';
  
  const header = document.createElement('div');
  header.className = 'card-header';
  
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-icon">
      <path d="M16 18 22 12 16 6"></path>
      <path d="M8 6 2 12 8 18"></path>
    </svg>
    ${repo.name}
  `;
  
  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = repo.description;
  
  header.appendChild(title);
  header.appendChild(description);
  
  const content = document.createElement('div');
  content.className = 'card-content';
  
  const topicBadges = document.createElement('div');
  topicBadges.className = 'topic-badges';
  
  // Show max 4 topics
  const visibleTopics = repo.topics.slice(0, 4);
  const remainingTopics = Math.max(0, repo.topics.length - 4);
  
  visibleTopics.forEach(topic => {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = topic;
    topicBadges.appendChild(badge);
  });
  
  if (remainingTopics > 0) {
    const badge = document.createElement('span');
    badge.className = 'badge badge-outline';
    badge.textContent = `+${remainingTopics}`;
    topicBadges.appendChild(badge);
  }
  
  content.appendChild(topicBadges);
  
  const footer = document.createElement('div');
  footer.className = 'card-footer';
  
  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline';
  link.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
    Ver no GitHub
  `;
  
  footer.appendChild(link);
  
  card.appendChild(header);
  card.appendChild(content);
  card.appendChild(footer);
  
  return card;
}