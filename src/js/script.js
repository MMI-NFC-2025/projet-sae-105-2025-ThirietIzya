(function(){
    const track = document.querySelector('.carrousel__track');
    if (!track) return;
    const prev = document.querySelector('.carrousel__btn--prev');
    const next = document.querySelector('.carrousel__btn--next');
    const getStep = () => {
        const item = track.querySelector('.carrousel__item');
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    };
    prev && prev.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
    next && next.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') track.scrollBy({ left: -getStep(), behavior: 'smooth' });
        if (e.key === 'ArrowRight') track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
})();