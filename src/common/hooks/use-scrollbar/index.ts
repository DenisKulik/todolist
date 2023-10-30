import {RefObject, useEffect} from 'react'
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
    let scrollbar: OverlayScrollbars;

    useEffect(() => {
        if (root.current) {
            scrollbar = OverlayScrollbars(root.current, config as OverlayScrollbars.Options)
        }

        return () => {
            if (scrollbar) {
                scrollbar.destroy();
            }
        }
    }, [root])
}
