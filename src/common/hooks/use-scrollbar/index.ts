import {RefObject, useEffect, useRef} from 'react'
import OverlayScrollbars from 'overlayscrollbars'

type ScrollbarConfig = {
    overflowBehavior: {
        x: string;
        y: string;
    }
}

const config: ScrollbarConfig = {
    overflowBehavior: {
        x: 'scroll',
        y: 'hidden'
    }
};

export const useScrollbar = (root: RefObject<HTMLElement>) => {
    const scrollbarRef = useRef<OverlayScrollbars | null>(null);

    useEffect(() => {
        if (root.current) {
            scrollbarRef.current = OverlayScrollbars(root.current, config as OverlayScrollbars.Options)
        }

        return () => {
            if (scrollbarRef.current) {
                scrollbarRef.current.destroy()
            }
        };
    }, [root]);

    return scrollbarRef;
};
