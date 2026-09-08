export function toSlug(title: string): string {
    return title.toLowerCase().replace(/ /g, '-')
}