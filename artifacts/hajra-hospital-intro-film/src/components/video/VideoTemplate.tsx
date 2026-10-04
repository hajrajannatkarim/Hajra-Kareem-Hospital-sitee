import { useEffect } from 'react';
import {
  VideoPausedContext,
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS = {
  identity: 3400,
  location: 3600,
  aroundTheClock: 3900,
  services: 4900,
  doctors: 3700,
  contact: 4300,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

const SCENE_COMPONENTS = {
  identity: Scene1,
  location: Scene2,
  aroundTheClock: Scene3,
  services: Scene4,
  doctors: Scene5,
  contact: Scene6,
} as const;

const CARRIER_POSES = [
  { left: '50%', top: '35%', width: '10vmin', height: '10vmin', borderColor: '#c9142e' },
  { left: '50%', top: '23%', width: '14vmin', height: '14vmin', borderColor: '#ef3340' },
  { left: '50%', top: '39%', width: '57vmin', height: '57vmin', borderColor: '#ffffff' },
  { left: '89%', top: '84%', width: '10vmin', height: '10vmin', borderColor: '#c9142e' },
  { left: '19%', top: '83%', width: '9vmin', height: '9vmin', borderColor: '#c9142e' },
  { left: '50%', top: '38%', width: '10vmin', height: '10vmin', borderColor: '#c9142e' },
] as const;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({
    durations,
    loop,
    paused,
  });
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_COMPONENTS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas
        aspectRatio={VIDEO_ASPECT_RATIO}
        className="film-canvas"
        style={{ backgroundColor: 'var(--hk-paper)' }}
      >
        <AnimatePresence mode="sync">
          {SceneComponent && (
            <SceneComponent key={currentSceneKey} />
          )}
        </AnimatePresence>
        {sceneIndex >= 0 && (
          <div className="film-carrier-layer" aria-hidden="true">
            <div
              className="film-carrier"
              style={CARRIER_POSES[sceneIndex]}
            />
          </div>
        )}
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
