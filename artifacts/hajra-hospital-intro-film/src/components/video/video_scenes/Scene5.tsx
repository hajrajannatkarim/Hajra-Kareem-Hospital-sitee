import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;
const BAND_WIDTHS = ['76%', '54%', '88%', '64%'];

export function Scene5() {
  const [handoff, setHandoff] = useState(false);
  useSceneTimer([{ time: 2980, callback: () => setHandoff(true) }]);

  return (
    <motion.section
      className="film-scene scene-doctors"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035, clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      <motion.div
        className="doctor-copy"
        animate={handoff ? { opacity: 0.1, y: '-4%' } : { opacity: 1, y: '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <p className="film-eyebrow">MEET THE TEAM</p>
        <h2>Our<br /><span>doctors.</span></h2>
        <motion.p
          className="doctor-note"
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={
            handoff
              ? { opacity: 0, clipPath: 'inset(0 0 0 100%)' }
              : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
          }
          transition={{ delay: handoff ? 0 : 0.45, duration: 0.48, ease: EASE }}
        >
          Consultation timings vary.
        </motion.p>
      </motion.div>
      <div className="doctor-bands" aria-hidden="true">
        {BAND_WIDTHS.map((width, index) => (
          <motion.div
            className={`doctor-band doctor-band-${index + 1}`}
            key={width}
            initial={{ width: 0, opacity: 0 }}
            animate={
              handoff
                ? { width: '0%', opacity: 0, x: index % 2 === 0 ? -18 : 18 }
                : { width, opacity: 1, x: 0 }
            }
            transition={{ delay: handoff ? index * 0.07 : 0.32 + index * 0.18, duration: 0.44, ease: EASE }}
          >
            <motion.span
              className="doctor-band-dot"
              initial={{ scale: 0 }}
              animate={handoff ? { scale: 0 } : { scale: 1 }}
              transition={{ delay: handoff ? 0 : 0.56 + index * 0.18, duration: 0.28, ease: EASE }}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="doctor-directory-label"
        initial={{ opacity: 0, y: 8 }}
        animate={handoff ? { opacity: 0, y: 0 } : { opacity: 0.65, y: 0 }}
        transition={{ delay: 0.9, duration: 0.38, ease: EASE }}
      >
        DOCTOR DIRECTORY
      </motion.div>
    </motion.section>
  );
}