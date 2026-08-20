const q = query(collection(db, 'fosa_posts'), orderBy('fecha', 'desc'));
// CORREGIDO: El onSnapshot ya no borra y redibuja todo cuando hay un cambio en los likes
onSnapshot(q, (snap) => {
  allPosts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const cont = document.getElementById('posts-container');
  
  // Si es la primera carga o no hay nada, dibujamos todo
  if (!cont || cont.innerHTML.trim() === '' || cont.innerHTML.includes('loading')) {
    renderPosts(allPosts);
  } else {
    // Si ya hay tarjetas, solo actualizamos los números de likes para evitar parpadeos
    allPosts.forEach(post => {
      const countEl = document.getElementById('like-count-' + post.id);
      if (countEl) {
        countEl.textContent = post.likes || 0;
      }
      // Actualizamos el icono solo si el usuario de esta PC no ha dado like aún
      const iconEl = document.getElementById('like-icon-' + post.id);
      if (iconEl && !localStorage.getItem('liked_' + post.id)) {
        iconEl.textContent = '🤍';
      }
    });
  }
}, err => { console.error(err); const cont = document.getElementById('posts-container'); if (cont) cont.innerHTML = '<div class="loading">Error al cargar.</div>'; });
