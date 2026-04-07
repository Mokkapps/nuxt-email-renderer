import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchYouTubeChannelFeed } from './youtube'

const SAMPLE_FEED_XML = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"
      xmlns:media="http://search.yahoo.com/mrss/"
      xmlns="http://www.w3.org/2005/Atom">
  <link rel="self" href="https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw"/>
  <id>yt:channel:UC_x5XG1OV2P6uZZ5FSM9Ttw</id>
  <yt:channelId>UC_x5XG1OV2P6uZZ5FSM9Ttw</yt:channelId>
  <title>Google Developers</title>
  <link rel="alternate" href="https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw"/>
  <author>
    <name>Google Developers</name>
    <uri>https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw</uri>
  </author>
  <published>2007-08-23T00:00:00+00:00</published>
  <entry>
    <id>yt:video:abc123</id>
    <yt:videoId>abc123</yt:videoId>
    <yt:channelId>UC_x5XG1OV2P6uZZ5FSM9Ttw</yt:channelId>
    <title>First Video</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=abc123"/>
    <author>
      <name>Google Developers</name>
      <uri>https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw</uri>
    </author>
    <published>2024-01-15T10:00:00+00:00</published>
    <updated>2024-01-16T08:00:00+00:00</updated>
    <media:group>
      <media:title>First Video</media:title>
      <media:content url="https://www.youtube.com/v/abc123?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
      <media:thumbnail url="https://i2.ytimg.com/vi/abc123/hqdefault.jpg" width="480" height="360"/>
      <media:description>Description of the first video.</media:description>
      <media:community>
        <media:starRating count="42" average="5.00" min="1" max="5"/>
        <media:statistics views="1234"/>
      </media:community>
    </media:group>
  </entry>
  <entry>
    <id>yt:video:def456</id>
    <yt:videoId>def456</yt:videoId>
    <yt:channelId>UC_x5XG1OV2P6uZZ5FSM9Ttw</yt:channelId>
    <title>Second Video</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=def456"/>
    <author>
      <name>Google Developers</name>
      <uri>https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw</uri>
    </author>
    <published>2024-02-20T14:30:00+00:00</published>
    <updated>2024-02-21T09:00:00+00:00</updated>
    <media:group>
      <media:title>Second Video</media:title>
      <media:content url="https://www.youtube.com/v/def456?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
      <media:thumbnail url="https://i2.ytimg.com/vi/def456/hqdefault.jpg" width="480" height="360"/>
      <media:description>Description of the second video.</media:description>
      <media:community>
        <media:starRating count="10" average="4.50" min="1" max="5"/>
        <media:statistics views="5678"/>
      </media:community>
    </media:group>
  </entry>
</feed>`

describe('fetchYouTubeChannelFeed', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('throws an error when channelId is empty', async () => {
    await expect(fetchYouTubeChannelFeed('')).rejects.toThrow(
      '[nuxt-email-renderer] YouTube channel ID is required',
    )
  })

  it('fetches the correct YouTube RSS feed URL', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(SAMPLE_FEED_XML),
    } as Response)

    await fetchYouTubeChannelFeed('UC_x5XG1OV2P6uZZ5FSM9Ttw')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw',
    )
  })

  it('throws a descriptive error on network failure', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockRejectedValue(new Error('getaddrinfo ENOTFOUND www.youtube.com'))

    await expect(fetchYouTubeChannelFeed('SOME_CHANNEL')).rejects.toThrow(
      '[nuxt-email-renderer] Network error while fetching YouTube channel feed for channel "SOME_CHANNEL": getaddrinfo ENOTFOUND www.youtube.com',
    )
  })

  it('throws an error when the HTTP response is not ok', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response)

    await expect(fetchYouTubeChannelFeed('INVALID_ID')).rejects.toThrow(
      '[nuxt-email-renderer] Failed to fetch YouTube channel feed for channel "INVALID_ID": 404 Not Found',
    )
  })

  it('parses the channel title from the feed', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(SAMPLE_FEED_XML),
    } as Response)

    const feed = await fetchYouTubeChannelFeed('UC_x5XG1OV2P6uZZ5FSM9Ttw')

    expect(feed.channelId).toBe('UC_x5XG1OV2P6uZZ5FSM9Ttw')
    expect(feed.title).toBe('Google Developers')
  })

  it('parses videos from the feed entries', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(SAMPLE_FEED_XML),
    } as Response)

    const feed = await fetchYouTubeChannelFeed('UC_x5XG1OV2P6uZZ5FSM9Ttw')

    expect(feed.videos).toHaveLength(2)
  })

  it('parses video fields correctly', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(SAMPLE_FEED_XML),
    } as Response)

    const feed = await fetchYouTubeChannelFeed('UC_x5XG1OV2P6uZZ5FSM9Ttw')
    const firstVideo = feed.videos[0]

    expect(firstVideo.id).toBe('abc123')
    expect(firstVideo.title).toBe('First Video')
    expect(firstVideo.url).toBe('https://www.youtube.com/watch?v=abc123')
    expect(firstVideo.publishedAt).toBe('2024-01-15T10:00:00+00:00')
    expect(firstVideo.thumbnail).toBe('https://i2.ytimg.com/vi/abc123/hqdefault.jpg')
    expect(firstVideo.description).toBe('Description of the first video.')
    expect(firstVideo.views).toBe(1234)
    expect(firstVideo.author.name).toBe('Google Developers')
    expect(firstVideo.author.url).toBe('https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw')
  })

  it('returns zero views when media:statistics is absent', async () => {
    const feedWithoutStats = SAMPLE_FEED_XML.replace(
      /<media:statistics views="1234"\/>/,
      '',
    )

    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(feedWithoutStats),
    } as Response)

    const feed = await fetchYouTubeChannelFeed('UC_x5XG1OV2P6uZZ5FSM9Ttw')

    expect(feed.videos[0].views).toBe(0)
  })

  it('encodes the channel ID in the request URL', async () => {
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(SAMPLE_FEED_XML),
    } as Response)

    await fetchYouTubeChannelFeed('UC test channel')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UC%20test%20channel',
    )
  })

  it('returns an empty videos array when the feed has no entries', async () => {
    const emptyFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"
      xmlns="http://www.w3.org/2005/Atom">
  <title>Empty Channel</title>
  <id>yt:channel:EMPTY123</id>
</feed>`

    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(emptyFeed),
    } as Response)

    const feed = await fetchYouTubeChannelFeed('EMPTY123')

    expect(feed.title).toBe('Empty Channel')
    expect(feed.videos).toHaveLength(0)
  })
})
