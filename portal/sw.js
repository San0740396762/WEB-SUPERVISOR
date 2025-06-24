const CACHE_NAME = "ttvc-portal-cache-v1";
const urlsToCache = [
  "/portal/index.html",
  "/portal/auth.html",
  "/portal/courses.html",
  "/portal/grades.html",
  "/portal/resources.html",
  "/portal/schedule.html",
  "/portal/auth.css",
  "/portal/common.css", 
  "/portal/courses.css",
  "/portal/dashboard.css",
  "/portal/grades.css",
  "/portal/resources.css",
  "/portal/schedule.css",
  "/portal/auth.js",
  "/portal/courses.js",
  "/portal/dashboard.js",
  "/portal/grades.js",
  "/portal/resources.js",
  "/portal/schedule.js",
  "/images/logo.PNG",
  "/images/Taveta_logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
