import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene1() {
  const [handoff, setHandoff] = useState(false);
  useSceneTimer([{ time: 3300, callback: () => setHandoff(true) }]);

  return (
    <motion.section
      className="film-scene scene-identity"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035, clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      <div className="scene-grain" aria-hidden="true" />
      <motion.div
        className="identity-orbit"
        initial={{ rotate: -18, scale: 0.82, opacity: 0.25 }}
        animate={
          handoff
            ? { rotate: 76, scale: 1.34, opacity: 0 }
            : { rotate: 0, scale: 1, opacity: 1 }
        }
        transition={{ duration: handoff ? 0.56 : 0.72, ease: EASE }}
        aria-hidden="true"
      >
        <span />
      </motion.div>
      <motion.p
        className="identity-kicker"
        initial={{ opacity: 0, y: 16, letterSpacing: '0.34em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.19em' }}
        transition={{ delay: 0.08, duration: 0.48, ease: EASE }}
      >
        CARE · COMPASSION · CURE
      </motion.p>
      <motion.div
        className="brand-crop identity-logo"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          handoff
            ? { opacity: 0.45, scale: 1.06, y: '-2%' }
            : { opacity: 1, scale: 1, y: '0%' }
        }
        transition={{ duration: handoff ? 0.58 : 0.8, ease: EASE }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/hajra-karim-logo-full.png`}
          alt="Hajra Kareem Hospital logo"
          fetchPriority="high"
        />
      </motion.div>
      <motion.h1
        className="identity-name"
        initial={{ opacity: 0, y: 20, clipPath: 'inset(100% 0 0 0)' }}
        animate={
          handoff
            ? { opacity: 0, y: -14, clipPath: 'inset(0 0 100% 0)' }
            : { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
        }
        transition={{ delay: handoff ? 0 : 0.28, duration: handoff ? 0.32 : 0.62, ease: EASE }}
      >
        Hajra Kareem Hospital
      </motion.h1>
      <motion.div
        className="identity-underline"
        initial={{ scaleX: 0 }}
        animate={handoff ? { scaleX: 0.15, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ delay: handoff ? 0 : 0.58, duration: 0.45, ease: EASE }}
        aria-hidden="true"
      />
      <span className="identity-location">FAISALABAD · PAKISTAN</span>
    </motion.section>
  );
}