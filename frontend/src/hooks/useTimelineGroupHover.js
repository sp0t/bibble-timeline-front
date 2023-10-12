import { useState, useCallback } from 'react';

const useTimelineGroupHover = () => {
  const [hovered, setHovered] = useState(false);

  const onmouseenter = useCallback(() => {
    if (!hovered) setHovered(true);
  }, [hovered]);

  const onmouseleave = useCallback(e => {
    if (hovered) {
      setHovered(false);
    }
  }, [hovered]);

  window.addEventListener('message', function(event) {
    console.log('Received message from iframe:', event.data);
    setHovered(false);
  });

  return [hovered, onmouseenter, onmouseleave];
};

export default useTimelineGroupHover;
