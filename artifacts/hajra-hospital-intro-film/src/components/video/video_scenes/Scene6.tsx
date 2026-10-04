import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene6() {
  const [handoff, setHandoff] = useState(false);
  useSceneTimer([{ time: 4200, callback: () => setHandoff(true) }]);

  return (
    <motion.section
      className="film-scene scene-contact"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      <motion.div
        className="contact-brand-crop"
        animate={
          handoff
            ? { scale: 1.12, opacity: 0.72, y: '-1.5%' }
            : { scale: 1, opacity: 1, y: '0%' }
        }
        transition={{ duration: handoff ? 0.64 : 0.55, ease: EASE }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/hajra-karim-logo-full.png`}
          alt="Hajra Kareem Hospital logo"
        />
      </motion.div>
      <motion.div
        className="contact-lower"
        animate={handoff ? { opacity: 0, y: 14, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.42, ease: EASE }}
      >
        <motion.p
          className="contact-tagline"
          initial={{ opacity: 0, letterSpacing: '0.32em', y: 10 }}
          animate={{ opacity: 1, letterSpacing: '0.12em', y: 0 }}
          transition={{ delay: 0.42, duration: 0.55, ease: EASE }}
        >
          Care • Compassion • Cure
        </motion.p>
        <div className="contact-lines">
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: handoff ? 0 : 1, x: handoff ? -12 : 0 }}
            transition={{ delay: 0.74, duration: 0.38, ease: EASE }}
          >
            <span>Landline</span>
            <strong>041-8500586</strong>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: handoff ? 0 : 1, x: handoff ? 12 : 0 }}
            transition={{ delay: 1.02, duration: 0.38, ease: EASE }}
          >
            <span>WhatsApp</span>
            <strong>0300-8655277</strong>
          </motion.p>
        </div>
        <motion.div
          className="contact-red-rule"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: handoff ? 0.04 : 1 }}
          transition={{ delay: handoff ? 0 : 1.28, duration: handoff ? 0.6 : 0.45, ease: EASE }}
          aria-hidden="true"
        />
      </motion.div>
      <span className="contact-footer">186-D, Batala Colony · Faisalabad</span>
    </motion.section>
  );
}