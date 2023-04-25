import { Dispatch, SetStateAction } from 'react'

export const setWindowWidth = (updateWidth: Dispatch<SetStateAction<number>>) => {
    if (window.innerWidth > 1400) updateWidth(6);
    if (window.innerWidth <= 1400 && window.innerWidth > 1100) updateWidth(5);
    if (window.innerWidth < 1100 && window.innerWidth >= 800) updateWidth(4);
    if (window.innerWidth < 800 && window.innerWidth >= 500) updateWidth(3);
    if (window.innerWidth < 500) updateWidth(2);
}