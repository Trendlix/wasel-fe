/** Document Y of element top (works with nested offset parents; `offsetTop` does not). */
export function getElementDocumentY(el: HTMLElement): number {
    return el.getBoundingClientRect().top + window.scrollY;
}
