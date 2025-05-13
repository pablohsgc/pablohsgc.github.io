// Repositories Page
let repositories = [];
let filteredRepos = [];
let allTopics = [];
let selectedTopic = null;
let currentView = 'grid';

// Elements
const topicSelect = document.getElementById('topic-select');
const reposGrid = document.getElementById('repos-grid');
const reposList = document.getElementById('repos-list');
const loadingElement = document.getElementById('loading-repos');
const emptyElement = document.getElementById('empty-repos');
const activeFilterContainer = document.getElementById('active-filter');
const activeFilterName = document.getElementById('active-filter-name');
const clearFilterBtn = document.getElementById('clear-filter');
const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');

// Fetch repositories
async function fetchRepositories() {
  try {
    // Show loading state
    loadingElement.classList.remove('hidden');
    reposGrid.classList.add('hidden');
    reposList.classList.add('hidden');
    emptyElement.classList.add('hidden');

    let data = await fetch("https://api.github.com/users/pablohsgc/repos").then(response => response.json());
    
    repositories = data;
    filteredRepos = data;
    
    // Extract all unique topics
    allTopics = Array.from(new Set(
      data.flatMap(repo => repo.topics || [])
    )).sort();
    
    // Populate topics dropdown
    populateTopicsDropdown();
    
    // Hide loading and show content
    loadingElement.classList.add('hidden');
    
    // Render repositories
    renderRepositories();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    loadingElement.classList.add('hidden');
    // Could show an error message here
  }
}

// Populate topics dropdown
function populateTopicsDropdown() {
  allTopics.forEach(topic => {
    const option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

// Filter repositories by topic
function filterRepositories() {
  if (selectedTopic) {
    filteredRepos = repositories.filter(repo => 
      repo.topics && repo.topics.includes(selectedTopic)
    );
    
    // Show active filter
    activeFilterContainer.classList.remove('hidden');
    activeFilterName.textContent = selectedTopic;
  } else {
    filteredRepos = repositories;
    activeFilterContainer.classList.add('hidden');
  }
  
  renderRepositories();
}

// Render repositories based on current view
function renderRepositories() {
  // Clear containers
  reposGrid.innerHTML = '';
  reposList.innerHTML = '';
  
  // Show empty state if no repositories
  if (filteredRepos.length === 0) {
    emptyElement.classList.remove('hidden');
    reposGrid.classList.add('hidden');
    reposList.classList.add('hidden');
    return;
  }
  
  // Hide empty state
  emptyElement.classList.add('hidden');
  
  // Render based on current view
  if (currentView === 'grid') {
    reposGrid.classList.remove('hidden');
    reposList.classList.add('hidden');
    
    // Create grid cards with animation delay
    filteredRepos.forEach((repo, index) => {
      const card = createRepoCard(repo);
      card.style.animationDelay = `${index * 0.1}s`;
      reposGrid.appendChild(card);
    });
  } else {
    reposList.classList.remove('hidden');
    reposGrid.classList.add('hidden');
    
    // Create list items with animation delay
    filteredRepos.forEach((repo, index) => {
      const listItem = createRepoListItem(repo);
      listItem.style.animationDelay = `${index * 0.1}s`;
      reposList.appendChild(listItem);
    });
  }
}


// Create repository list item for list view
function createRepoListItem(repo) {
  const listItem = document.createElement('div');
  listItem.className = 'repo-list-item animate-fade-in';
  
  const content = document.createElement('div');
  content.className = 'repo-list-content';
  
  const info = document.createElement('div');
  info.className = 'repo-list-info';
  
  const title = document.createElement('h3');
  title.textContent = repo.name;
  
  const description = document.createElement('p');
  description.textContent = repo.description;
  
  info.appendChild(title);
  info.appendChild(description);
  
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
  
  info.appendChild(topicBadges);
  
  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-outline';
  link.textContent = 'Ver no GitHub';
  
  content.appendChild(info);
  content.appendChild(link);
  
  listItem.appendChild(content);
  
  return listItem;
}

// Event Listeners

// Topic select
if (topicSelect) {
  topicSelect.addEventListener('change', (e) => {
    selectedTopic = e.target.value === 'all' ? null : e.target.value;
    filterRepositories();
  });
}

// Clear filter button
if (clearFilterBtn) {
  clearFilterBtn.addEventListener('click', () => {
    selectedTopic = null;
    topicSelect.value = 'all';
    filterRepositories();
  });
}

// View toggle buttons
if (viewToggleBtns) {
  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      viewToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Set current view
      currentView = btn.dataset.view;
      
      // Render repositories with new view
      renderRepositories();
    });
  });
}

// Initialize
fetchRepositories();
