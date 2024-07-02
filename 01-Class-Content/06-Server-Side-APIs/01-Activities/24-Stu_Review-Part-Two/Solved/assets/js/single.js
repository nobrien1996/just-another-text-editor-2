const repoNameEl = document.querySelector('#repo-name');
const issueContainerEl = document.querySelector('#issues-container');
const limitWarningEl = document.querySelector('#limit-warning');

const getRepoName = function () {
  // This is coming from the URL search bar in the browser. It is what comes after the `?`.
  const queryString = document.location.search;
  const repoName = queryString.split('=')[1];

  if (repoName) {
    repoNameEl.textContent = repoName;

    getRepoIssues(repoName);
  } else {
    // This will run and return to the homepage if there was nothing in the URL query parameter.
    document.location.replace('./index.html');
  }
};

const getRepoIssues = function (repo) {
  const apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        // Since GitHub only returns 30 results at a time, we check to see if there's more than 30 by looking for a next page URL in the response headers.
        if (response.headers.get('Link')) {
          displayWarning(repo);
        }
      });
    } else {
      document.location.replace('./index.html');
    }
  });
};

const displayIssues = function (issues) {
  // This will check for strict equality. Using `!issues.length` works, but only because JavaScript considers `0` to be `falsy`.
  if (issues.length === 0) {
    issueContainerEl.textContent = 'This repo has no open issues!';
    return;
  }

  for (let issueObj of issues) {
    const issueEl = document.createElement('a');
    issueEl.classList = 'list-item flex-row justify-space-between align-center';
    issueEl.setAttribute('href', issueObj.html_url);
    issueEl.setAttribute('target', '_blank');

    const titleEl = document.createElement('span');
    titleEl.textContent = issueObj.title;
    issueEl.appendChild(titleEl);

    const typeEl = document.createElement('span');

    // If there's already a pull request open, it's a good idea we focus on other open issues that no one has worked on.
    if (issueObj.pull_request) {
      typeEl.textContent = '(Pull request)';
    } else {
      typeEl.textContent = '(Issue)';
    }

    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  }
};

// When there are more issues than what GitHub has returned, we let the user know by printing a message with a link to the page.
const displayWarning = function (repo) {
  limitWarningEl.textContent = 'To see more than 30 issues, visit ';

  const linkEl = document.createElement('a');
  linkEl.textContent = 'GitHub.com';
  linkEl.setAttribute('href', `https://github.com/${repo}/issues`);
  linkEl.setAttribute('target', '_blank');

  // This will appear on the bottom of the page.
  limitWarningEl.appendChild(linkEl);
};

getRepoName();
