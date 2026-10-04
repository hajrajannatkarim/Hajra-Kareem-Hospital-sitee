import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, Repeat } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from '@/components/video/VideoTemplate';
import { useSceneControls } from '@/components/video/useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  identity: { title: 'Identity', filePath: 'src/components/video/video_scenes/Scene1.tsx' },
  location: { title: 'Location', filePath: 'src/components/video/video_scenes/Scene2.tsx' },
  aroundTheClock: { title: '24-hour services', filePath: 'src/components/video/video_scenes/Scene3.tsx' },
  services: { title: 'General services', filePath: 'src/components/video/video_scenes/Scene4.tsx' },
  doctors: { title: 'Doctors', filePath: 'src/components/video/video_scenes/Scene5.tsx' },
  contact: { title: 'Contact', filePath: 'src/components/video/video_scenes/Scene6.tsx' },
};

const SCENE_LABELS: Record<string, string> = {
  identity: 'Identity',
  location: 'Location',
  aroundTheClock: '24-hour services',
  services: 'Services',
  doctors: 'Doctors',
  contact: 'Contact',
};

const REVEAL_SENSOR_HEIGHT = '25%';

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;
  window.parent.postMessage(
    {
      type: 'REPLIT_VIDEO_SCENE_SELECTED',
      payload: {
        sceneIndex: index,
        sceneCount: sceneKeys.length,
        sceneTitle: details.title || key,
        filePath: details.filePath,
        lineNumber: 1,
      },
    },
    '*',
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const {
    sceneKeys,
    activeIndex,
    locked,
    paused,
    mountKey,
    tick,
    durations,
    activeDuration,
    activeStartTime,
    totalDuration,
    onSceneChange,
    jumpTo,
    toggleLock,
    togglePause,
  } = useSceneControls(SCENE_DURATIONS);

  const handleJumpTo = useCallback((index: number) => {
    jumpTo(index);
    announceSceneSelection(index, sceneKeys);
  }, [jumpTo, sceneKeys]);

  useEffect(() => {
    if (!paused || typeof document.getAnimations !== 'function') return;
    const frozen = document
      .getAnimations()
      .filter((animation) => animation.playState === 'running');
    frozen.forEach((animation) => animation.pause());
    return () => frozen.forEach((animation) => animation.play());
  }, [paused]);

  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);

  const handlePointerEnter = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  }, []);

  const handlePointerLeave = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
  }, [collapsed]);

  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((current) => {
      if (!current) {
        setHovering(false);
        setTapPinned(false);
      }
      return !current;
    });
  }, []);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const onDocumentPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      const sensor = sensorRef.current;
      if (sensor && !sensor.contains(event.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', onDocumentPointerDown);
    return () => document.removeEventListener('pointerdown', onDocumentPointerDown);
  }, [collapsed, tapPinned]);

  if (!isIframed) return <VideoTemplate />;

  const barVisible = !collapsed || hovering || tapPinned;

  return (
    <div className="video-controls-shell">
      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop
        paused={paused}
        onSceneChange={onSceneChange}
      />
      <div
        ref={sensorRef}
        className="control-sensor"
        style={{ height: REVEAL_SENSOR_HEIGHT }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <div className="control-sensor-filler" aria-hidden="true" />
        <ControlBar
          visible={barVisible}
          collapsed={collapsed}
          locked={locked}
          paused={paused}
          sceneKeys={sceneKeys}
          activeIndex={activeIndex}
          activeDuration={activeDuration}
          activeStartTime={activeStartTime}
          totalDuration={totalDuration}
          tick={tick}
          onTogglePause={togglePause}
          onToggleLock={toggleLock}
          onJumpTo={handleJumpTo}
          onToggleCollapsed={handleToggleCollapsed}
        />
      </div>
    </div>
  );
}

interface ControlBarProps {
  visible: boolean;
  collapsed: boolean;
  locked: boolean;
  paused: boolean;
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  onTogglePause: () => void;
  onToggleLock: () => void;
  onJumpTo: (index: number) => void;
  onToggleCollapsed: () => void;
}

function ControlBar({
  visible,
  collapsed,
  locked,
  paused,
  sceneKeys,
  activeIndex,
  activeDuration,
  activeStartTime,
  totalDuration,
  tick,
  onTogglePause,
  onToggleLock,
  onJumpTo,
  onToggleCollapsed,
}: ControlBarProps) {
  return (
    <div
      className={`control-bar ${visible ? 'control-bar-visible' : 'control-bar-hidden'}`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        className="control-icon-button"
        onClick={onTogglePause}
        title={paused ? 'Play' : 'Pause'}
        aria-label={paused ? 'Play' : 'Pause'}
        tabIndex={visible ? 0 : -1}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
      <button
        type="button"
        className={`control-icon-button ${locked ? 'control-icon-button-active' : ''}`}
        onClick={onToggleLock}
        title={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
        aria-label={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
        aria-pressed={locked}
        tabIndex={visible ? 0 : -1}
      >
        <Repeat aria-hidden="true" />
      </button>
      <span className="control-divider" aria-hidden="true" />
      <PlaybackStatus
        sceneKeys={sceneKeys}
        activeIndex={activeIndex}
        activeDuration={activeDuration}
        activeStartTime={activeStartTime}
        totalDuration={totalDuration}
        tick={tick}
        paused={paused}
        onJumpTo={onJumpTo}
        visible={visible}
      />
      <button
        type="button"
        className="control-icon-button control-chevron"
        onClick={onToggleCollapsed}
        title={collapsed ? 'Show controls' : 'Hide controls'}
        aria-label={collapsed ? 'Show controls' : 'Hide controls'}
        aria-expanded={!collapsed}
        tabIndex={visible ? 0 : -1}
      >
        {collapsed ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
      </button>
    </div>
  );
}

function PlaybackStatus({
  sceneKeys,
  activeIndex,
  activeDuration,
  activeStartTime,
  totalDuration,
  tick,
  paused,
  onJumpTo,
  visible,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
  visible: boolean;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    const intervalId = window.setInterval(() => {
      setElapsed(elapsedBaseRef.current + (performance.now() - startedAt));
    }, 60);
    return () => {
      window.clearInterval(intervalId);
      elapsedBaseRef.current += performance.now() - startedAt;
    };
  }, [tick, paused]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(
    totalDuration,
    activeStartTime + Math.min(elapsed, activeDuration),
  );

  return (
    <>
      <div className="control-progress-list" role="group" aria-label="Video scenes">
        {sceneKeys.map((key, index) => (
          <button
            type="button"
            className={`control-progress-segment ${index === activeIndex ? 'control-progress-active' : ''}`}
            key={key}
            onClick={() => onJumpTo(index)}
            aria-label={`Jump to scene ${index + 1}: ${SCENE_LABELS[key] ?? key}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            tabIndex={visible ? 0 : -1}
          >
            <span
              className="control-progress-fill"
              style={{ width: `${index === activeIndex ? progress * 100 : index < activeIndex ? 100 : 0}%` }}
            />
          </button>
        ))}
      </div>
      <span className="control-scene-count" aria-live="polite">
        {activeIndex + 1}/{sceneKeys.length}
      </span>
      <span
        className="control-timer"
        role="timer"
        aria-label={`Playback time ${formatPlaybackTime(totalElapsed)} of ${formatPlaybackTime(totalDuration)}`}
      >
        {formatPlaybackTime(totalElapsed)} / {formatPlaybackTime(totalDuration)}
      </span>
    </>
  );
}

function formatPlaybackTime(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}