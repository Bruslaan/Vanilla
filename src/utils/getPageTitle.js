import defaultSettings from '../settings'

const title = defaultSettings.title || 'Vanilla'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}