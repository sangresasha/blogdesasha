const q = query(collection(db, 'fosa_posts'), orderBy('fecha', 'desc'));
onSnapshot(q, (snap) => {
  allPosts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  const cont = document.getElementById('posts-container');
  
  // Si es la primera vez que carga (o está vacío), dibujamos todo
  if (cont.innerHTML.includes('loading') || cont.innerHTML === '') {
    renderPosts(allPosts);
  } else {
    // Si ya hay tarjetas cargadas, SOLO actualizamos el número de likes para evitar parpadeos
    allPosts.forEach(post => {
      const countEl = document.getElementById('like-count-' + post.id);
      if (countEl) {
        countEl.textContent = post.likes || 0;
      }
    });
  }
}, err => {
  console.error(err);
  const cont = document.getElementById('posts-container');
  if (cont) cont.innerHTML = '<div class="loading">Error al cargar.</div>';
});
