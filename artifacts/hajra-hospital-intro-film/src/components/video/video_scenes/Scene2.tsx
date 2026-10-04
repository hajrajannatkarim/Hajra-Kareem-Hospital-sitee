import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene2() {
  const [handoff, setHandoff] = useState(false);
  useSceneTimer([{ time: 2950, callback: () => setHandoff(true) }]);

  return (
    <motion.section
      className="film-scene scene-location"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      <div className="location-grid" aria-hidden="true" />
      <svg className="location-route" viewBox="0 0 400 850" fill="none" aria-hidden="true">
        <motion.path
          d="M-12 634 C84 634 82 566 155 566 C228 566 190 457 246 457 C291 457 296 347 408 347"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 11"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: handoff ? 0.35 : 1, opacity: handoff ? 0.1 : 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </svg>
      <motion.div
        className="location-pin-tail"
        initial={{ scaleY: 0.5, opacity: 0 }}
        animate={{ scaleY: handoff ? 1.5 : 1, opacity: handoff ? 0 : 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        aria-hidden="true"
      />
      <motion.div
        className="location-copy"
        animate={handoff ? { y: '-5%', opacity: 0.18 } : { y: '0%', opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="film-eyebrow">HERE IN FAISALABAD</p>
        <h2>
          A hospital
          <br />
          in <span>Faisalabad.</span>
        </h2>
        <p className="location-country">Pakistan</p>
        <div className="location-rule" aria-hidden="true">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.56, ease: EASE }}
          />
        </div>
        <motion.address
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: handoff ? -8 : 0 }}
          transition={{ delay: 0.62, duration: 0.5, ease: EASE }}
        >
          <span>186-D, Batala Colony,</span>
          <span>Babar Chowk, Faisalabad,</span>
          <span>Pakistan</span>
        </motion.address>
      </motion.div>
      <motion.div
        className="location-coordinate"
        initial={{ opacity: 0, x: 22 }}
        animate={{ opacity: handoff ? 0 : 0.68, x: 0 }}
        transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
      >
        LOCATION · FAISALABAD
      </motion.div>
    </motion.section>
  );
}