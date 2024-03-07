export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const loadHTML = async (url, element) => {
  const response = await fetch(url);
  const html = await response.text();
  element.innerHTML = html;
};

const routes = [
  {
    path: '/',
    view: () =>
      loadHTML('/src/pages/home.html', document.getElementById('main')),
  },
  {
    path: '/form',
    view: () =>
      loadHTML('/src/pages/form.html', document.getElementById('main')),
  },
];

export const router = async () => {
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  if (typeof match.route.view === 'function') {
    await match.route.view();
  } else {
    document.getElementById('main').innerHTML = match.route.view;
  }
};
