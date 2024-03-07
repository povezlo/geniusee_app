export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const loadHTML = async (url, element) => {
  const response = await fetch(url);
  const html = await response.text();
  element.innerHTML = html;
};

export const setActiveRoute = () => {
  document.querySelectorAll('nav ul li a').forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

export const router = async () => {
  const routes = [
    {
      path: '/',
      view: () =>
        loadHTML('/src/pages/home/home.html', document.getElementById('main')),
    },
    {
      path: '/form',
      view: () =>
        loadHTML('/src/pages/form/form.html', document.getElementById('main')),
      script: () => import('/src/pages/form/form.js'),
    },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = { route: routes[0], isMatch: true };
  }

  if (typeof match.route.view === 'function') {
    await match.route.view();
  } else {
    document.getElementById('main').innerHTML = match.route.view;
  }

  // Динамическая загрузка скрипта для формы
  if (match.route.script) {
    match.route.script().catch((err) => {
      console.error('Failed to load the script:', err);
    });
  }
};
