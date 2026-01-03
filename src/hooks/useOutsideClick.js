import { useEffect, useRef } from 'react';

export function useOutsideClick(
  handler,
  listenCapturing = true
) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    //3-rd arg sets that we want to listen to event only in capturing phase not in bubbling phase
    //capturing - top -> down:
    //Top is biggest parent, which is window,
    //Bottom is lowest element which is element you clicked
    // The event starts at the root (window → document → html → body → ...)
    // and travels down the DOM tree toward the element you clicked. The event reaches the actual element you clicked.
    //bubbling - down -> top: The event then bubbles up from the target element back up to the root.
    //Conclusion: we do not trigger document click event, cuz our child not open yet
    document.addEventListener('click', handleClick, {
      capture: listenCapturing,
    });

    return () =>
      document.removeEventListener('click', handleClick, {
        capture: listenCapturing,
      });
  }, [handler]);

  return ref;
}
