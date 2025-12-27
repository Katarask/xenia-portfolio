import { memo } from 'react';

// ============================================
// TRANSITION IMAGES - Between sections
// ============================================
const TRANSITION_IMAGES = {
  1: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg',
  2: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg',
  3: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467f_Kuko%202%20tags-44.jpg',
};

// ============================================
// TRANSITION SECTION - Full-screen image
// Width: 100vw, Height: 90vh
// ============================================
const Transition = memo(({ imageNum }) => (
  <section
    className={`section_transition is-image-${imageNum}`}
    style={{
      backgroundImage: `url(${TRANSITION_IMAGES[imageNum]})`,
    }}
  />
));

Transition.displayName = 'Transition';

export default Transition;
