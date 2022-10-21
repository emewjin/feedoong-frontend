export const CACHE_KEYS = {
  feeds: ['feeds'],
  likedItems: ['likedItems'],
  likeItem: (id: number) => [...CACHE_KEYS.likedItems, id],
  subscriptions: ['subscriptions'],
  preview: (url?: string) => ['channels', 'preview', url],
  signup: ['signup'],
  me: ['me'],
  viewItem: (id: number) => ['viewItem', id],
}
