import type { CSSProperties } from 'react';
import './Media.css';

/** The sanctioned fixed ratios (layout.md → Alignment rules). */
export type MediaRatio = '1:1' | '2:1' | '4:1' | '21:9' | '14:3' | '9:8' | '6:7' | '1:2' | '9:21';

export interface MediaProps {
  /** `video` always plays muted, looped and inline, starting by itself. */
  kind?: 'image' | 'video';
  /** File URL. Without it the component shows a placeholder. */
  src?: string;
  /** Describes the image or video. Required: case-study media carries meaning. */
  alt: string;
  /** Video still shown before playback starts. */
  poster?: string;
  /**
   * Crops to a fixed ratio. Without it a file keeps its natural height,
   * and a placeholder uses 2:1.
   */
  ratio?: MediaRatio;
}

const ratioValue = (r: MediaRatio) => r.replace(':', ' / ');

/** An image, a video or a placeholder for one (radius md). */
export function Media({ kind = 'image', src, alt, poster, ratio }: MediaProps) {
  const style = ratio ? ({ aspectRatio: ratioValue(ratio) } as CSSProperties) : undefined;

  if (!src) {
    return (
      <div className="sg-media sg-media--placeholder" role="img" aria-label={alt} style={{ aspectRatio: ratioValue(ratio ?? '2:1') }}>
        <span className="sg-media__placeholder-label">{kind === 'video' ? 'Video' : 'Image'}</span>
      </div>
    );
  }

  if (kind === 'video') {
    return (
      <video className="sg-media" src={src} poster={poster} style={style} autoPlay muted loop playsInline aria-label={alt} />
    );
  }

  return <img className="sg-media" src={src} alt={alt} style={style} />;
}
