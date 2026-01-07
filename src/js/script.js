(function(){
    const tracks = document.querySelectorAll('.carrousel__track, .frise__matilda');
    if (!tracks.length) return;

    const leftSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const rightSvg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    tracks.forEach(track => {
        track.setAttribute('tabindex', '0');
        // Place buttons inside a container that makes sense for positioning
        // Si le track est dans un wrapper .carrousel__1, utilise ce wrapper ; sinon, place les boutons dans le track lui-même (ex: frise__matilda)
        const container = track.closest('.carrousel__1') || track;
        let prev = container.querySelector('.carrousel__btn--prev');
        let next = container.querySelector('.carrousel__btn--next');

        // Crée des boutons si nécessaire (pour la frise qui n'en a pas dans le HTML)
        if (!prev) {
            prev = document.createElement('button');
            prev.className = 'carrousel__btn carrousel__btn--prev';
            prev.setAttribute('aria-label','Précédent');
            prev.innerHTML = leftSvg;
            // Si container === track (cas de .frise__matilda), on insère prev en premier enfant
            if (container === track) {
                container.insertBefore(prev, container.firstElementChild || null);
            } else {
                container.insertBefore(prev, track);
            }
        }
        if (!next) {
            next = document.createElement('button');
            next.className = 'carrousel__btn carrousel__btn--next';
            next.setAttribute('aria-label','Suivant');
            next.innerHTML = rightSvg;
            // next en dernier enfant (fin du track) pour que sticky le montre à droite
            container.appendChild(next);
        }

        const getStep = () => {
            const item = track.querySelector('.carrousel__item, .frise__carte');
            const gap = parseFloat(getComputedStyle(track).gap) || 16;
            return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
        };

        prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
        next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));

        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') track.scrollBy({ left: -getStep(), behavior: 'smooth' });
            if (e.key === 'ArrowRight') track.scrollBy({ left: getStep(), behavior: 'smooth' });
        });
    });
})();

/* -----------------------------------------------
   Menu toggle: accessible hamburger behaviour
   - toggles aria-expanded and [hidden]
   - closes on ESC or click outside
   - closes on window resize > breakpoint
   ----------------------------------------------- */
(function(){
    const btn = document.querySelector('.header__menu-button');
    const nav = document.querySelector('.header__menu.menu#mainNav') || document.querySelector('.header__menu.menu');
    if (!btn || !nav) return;

    const open = () => {
        btn.setAttribute('aria-expanded','true');
        nav.removeAttribute('hidden');
        nav.classList.add('is-open');
        // move focus to first link for keyboard users
        const first = nav.querySelector('a, button');
        if (first) first.focus();
    };
    const close = () => {
        btn.setAttribute('aria-expanded','false');
        nav.setAttribute('hidden','');
        nav.classList.remove('is-open');
        btn.focus();
    };

    btn.addEventListener('click', (e) => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) close(); else open();
    });

    // click outside to close
    document.addEventListener('click', (e) => {
        if (nav.hasAttribute('hidden')) return;
        if (!nav.contains(e.target) && !btn.contains(e.target)) close();
    });

    // escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !nav.hasAttribute('hidden')) close();
    });

    // ensure menu closes when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && !nav.hasAttribute('hidden')) close();
    });
})();