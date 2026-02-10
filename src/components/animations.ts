export const splitScreenVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0 }
};

// Ancient Magic Physics: Heavy Ease-In-Out (starts slow (inertia), speeds up, slows down)
const heavyPhysics = { duration: 2.5, ease: [0.77, 0, 0.175, 1] };

export const pinkSideVariants = {
    initial: { x: '-100%' },
    animate: { x: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } },
    exit: { x: '-100%', transition: heavyPhysics }
};

export const whiteSideVariants = {
    initial: { x: '100%' },
    animate: { x: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } },
    exit: { x: '100%', transition: heavyPhysics }
};

export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};
