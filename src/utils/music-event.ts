import type { Show } from '@/content.config'

type Performer = {
  name: string
  url?: string
}

const SCHEMA = 'https://schema.org/'

// Maps a show to a schema.org MusicEvent for JSON-LD
export function toMusicEvent(show: Show, performer: Performer) {
  const { name, description, location, date, endDate, eventStatus, image, tickets, freeEntry } =
    show

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name,
    description,
    startDate: date.toISOString(),
    endDate: endDate?.toISOString(),
    eventStatus: `${SCHEMA}${eventStatus}`,
    eventAttendanceMode: `${SCHEMA}OfflineEventAttendanceMode`,
    image,
    location: {
      '@type': 'Place',
      name: location.name,
      url: location.url,
      address: { '@type': 'PostalAddress', ...location.address },
    },
    performer: { '@type': 'Person', ...performer },
    organizer: { '@type': 'Person', ...performer },
    offers:
      tickets || freeEntry
        ? {
            '@type': 'Offer',
            url: tickets,
            availability: `${SCHEMA}InStock`,
            ...(freeEntry && { price: 0, priceCurrency: 'GBP' }),
          }
        : undefined,
  }
}
