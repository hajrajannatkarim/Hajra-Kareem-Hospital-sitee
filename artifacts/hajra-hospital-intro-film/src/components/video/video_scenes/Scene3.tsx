import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene3() {
  const [handoff, setHandoff] = useState(false);
  useSceneTimer([{ time: 3800, callback: () => setHandoff(true) }]);

  return (
    <motion.section
      className="film-scene scene-emergency"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      <motion.div
        className="emergency-dial"
        initial={{ scale: 0.16, rotate: -9, y: '-35%' }}
        animate={
          handoff
            ? { scale: 1.36, rotate: 24, y: 0, opacity: 0 }
            : { scale: 1, rotate: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: handoff ? 0.58 : 0.72, ease: EASE }}
        aria-hidden="true"
      >
        <span className="dial-notch notch-one" />
        <span className="dial-notch notch-two" />
        <span className="dial-notch notch-three" />
        <span className="dial-notch notch-four" />
      </motion.div>
      <motion.p
        className="emergency-eyebrow"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: handoff ? 0 : 1, y: handoff ? -12 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        EMERGENCY + GYNECOLOGY
      </motion.p>
      <motion.div
        className="emergency-number"
        initial={{ opacity: 0.2, scale: 0.86 }}
        animate={handoff ? { opacity: 0, scale: 1.14 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.44, ease: EASE }}
        aria-hidden="true"
      >
        24
      </motion.div>
      <motion.p
        className="emergency-hours"
        initial={{ opacity: 0, y: 24, letterSpacing: '0.1em' }}
        animate={
          handoff
            ? { opacity: 0, y: 18 }
            : { opacity: 1, y: 0, letterSpacing: '0.22em' }
        }
        transition={{ delay: handoff ? 0 : 0.28, duration: 0.52, ease: EASE }}
      >
        HOURS A DAY
      </motion.p>
      <motion.div
        className="emergency-notice"
        initial={{ opacity: 0, clipPath: 'inset(0 50% 0 50%)', scale: 0.98 }}
        animate={
          handoff
            ? { opacity: 0, clipPath: 'inset(0 50% 0 50%)', scale: 0.96 }
            : { opacity: 1, clipPath: 'inset(0 0% 0 0%)', scale: 1 }
        }
        transition={{ delay: handoff ? 0 : 0.58, duration: 0.54, ease: EASE }}
      >
        Emergency and
        <br />
        Gynecology services
        <br />
        are available
        <br />
        24 hours a day.
      </motion.div>
      <motion.div
        className="emergency-footline"
        initial={{ scaleX: 0 }}
        animate={handoff ? { scaleX: 0.1, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ delay: handoff ? 0 : 0.9, duration: 0.45, ease: EASE }}
        aria-hidden="true"
      />
    </motion.section>
  );
}