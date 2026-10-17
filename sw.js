// 최소 서비스 워커: 설치 조건용. 네트워크 우선, 실패하면 캐시.
const C='c70-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{try{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}catch(x){}return r;}).catch(()=>caches.match(e.request)));
});
