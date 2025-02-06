import { Variants } from 'framer-motion';

export const useAnimations = () => {
  const fadeInUp: Variants = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const staggerContainer: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeIn: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const slideIn: Variants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const scaleIn: Variants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const rotateIn: Variants = {
    initial: {
      rotate: -180,
      opacity: 0,
    },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  };

  const cardHover = {
    y: -10,
    transition: {
      duration: 0.2,
    },
  };

  const imageHover = {
    scale: 1.1,
    transition: {
      duration: 0.4,
    },
  };

  const listContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItem: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const pageTransition: Variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  return {
    fadeInUp,
    staggerContainer,
    fadeIn,
    slideIn,
    scaleIn,
    rotateIn,
    buttonHover,
    cardHover,
    imageHover,
    listContainer,
    listItem,
    pageTransition,
  };
}; 