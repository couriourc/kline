export function vw(px: `${number}px` | number) {
    return `${((parseFloat(('' + px).replace('px', '')) / 1920) * 100).toFixed(5)}vw`;
}
