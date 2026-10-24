import { describe, expect, it } from 'vite-plus/test'
import type { Show } from '@/content.config'
import { toMusicEvent } from './music-event'

const show: Show = {
  name: 'Example Show',
  description: 'Doors 7pm',
  location: { name: 'The Waiting Room', address: { addressLocality: 'London' } },
  date: new Date('2026-11-14T19:00:00+00:00'),
  tickets: 'https://dice.fm/event/example',
  freeEntry: false,
  eventStatus: 'EventScheduled',
}

const performer = { name: 'Diz Toba', url: 'https://diztoba.com/' }

describe('toMusicEvent', () => {
  it('maps a show to a schema.org MusicEvent', () => {
    expect(toMusicEvent(show, performer)).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: 'Example Show',
      description: 'Doors 7pm',
      startDate: '2026-11-14T19:00:00.000Z',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'The Waiting Room',
        address: { '@type': 'PostalAddress', addressLocality: 'London' },
      },
      performer: { '@type': 'Person', name: 'Diz Toba', url: 'https://diztoba.com/' },
      offers: {
        '@type': 'Offer',
        url: 'https://dice.fm/event/example',
        availability: 'https://schema.org/InStock',
      },
    })
  })

  it('adds a zero price for free entry', () => {
    const { offers } = toMusicEvent({ ...show, freeEntry: true }, performer)

    expect(offers).toMatchObject({ price: 0, priceCurrency: 'GBP' })
  })

  it('omits offers when there are no tickets and entry is not free', () => {
    const { offers } = toMusicEvent({ ...show, tickets: undefined }, performer)

    expect(offers).toBeUndefined()
  })

  it('uses the status and end date when given', () => {
    const event = toMusicEvent(
      { ...show, eventStatus: 'EventCancelled', endDate: new Date('2026-11-14T23:00:00+00:00') },
      performer,
    )

    expect(event.eventStatus).toBe('https://schema.org/EventCancelled')
    expect(event.endDate).toBe('2026-11-14T23:00:00.000Z')
  })
})
