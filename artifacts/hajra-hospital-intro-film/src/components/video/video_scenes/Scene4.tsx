import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;
const SERVICES = [
  'Major and minor operations',
  'Normal delivery',
  'Appendix surgery',
  'Hernia surgery',
  'Tonsil surgery',
  'Family planning consultation',
  'Child circumcision (modern methods)',
];

export function Scene4() {
  const [handoff, setHandoff] = useState(false);
  useSceneTimer([{ time: 4010, callback: () => setHandoff(true) }]);

  return (
    <motion.section
      className="film-scene scene-services"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035, clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      <motion.div
        className="services-heading"
        initial={{ opacity: 0, y: 12 }}
        animate={handoff ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: EASE }}
      >
        <p className="film-eyebrow">CARE AT HAJRA KAREEM</p>
        <h2>General services</h2>
      </motion.div>
      <div className="services-list">
        {SERVICES.map((service, index) => (
          <motion.div
            className="service-row"
            key={service}
            initial={{ opacity: 0, x: -22, clipPath: 'inset(0 100% 0 0)' }}
            animate={
              handoff
                ? { opacity: 0, x: 12, clipPath: 'inset(0 0 0 100%)' }
                : { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
            }
            transition={{
              delay: handoff ? index * 0.025 : 0.34 + index * 0.19,
              duration: handoff ? 0.28 : 0.42,
              ease: EASE,
            }}
          >
            <span className="service-bullet" aria-hidden="true" />
            <span>{service}</span>
            <motion.span
              className="service-rule"
              initial={{ scaleX: 0 }}
              animate={handoff ? { scaleX: 0.18 } : { scaleX: 1 }}
              transition={{ delay: handoff ? index * 0.025 : 0.55 + index * 0.2, duration: 0.32, ease: EASE }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="services-index"
        initial={{ opacity: 0, y: 12 }}
        animate={handoff ? { opacity: 0, y: 9 } : { opacity: 0.68, y: 0 }}
        transition={{ delay: 1.58, duration: 0.36, ease: EASE }}
      >
        GENERAL CARE · FAISALABAD
      </motion.div>
    </motion.section>
  );
}