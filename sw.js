/* Sekiro · service worker: guarda la app para abrirla sin conexión. Sube VERSION cada vez que cambies index.html. */
const VERSION = 'sekiro-v5.1-2026-11-02';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin === location.origin){
    e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; }).catch(() => caches.match('./index.html'))));
  } else if (url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com')){
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; }).catch(() => new Response('', {status:408}))));
  }
});
