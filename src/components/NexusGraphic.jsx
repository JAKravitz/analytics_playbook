import { useEffect, useRef, useState } from 'react';
import { nexusGraphicHTML } from '../data/nexusGraphic.js';

const SOURCE_WIDTH = 1600;
const SOURCE_HEIGHT = 900;

export default function NexusGraphic() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.max(0.1, w / SOURCE_WIDTH));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const containerHeight = SOURCE_HEIGHT * scale;

  return (
    <div ref={containerRef} className="nexus-frame" style={{ height: containerHeight }}>
      <iframe
        title="NEXUS architecture"
        srcDoc={nexusGraphicHTML}
        style={{ transform: `scale(${scale})` }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
