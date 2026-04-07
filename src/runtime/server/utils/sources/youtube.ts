const YOUTUBE_RSS_BASE_URL = 'https://www.youtube.com/feeds/videos.xml'

export interface YouTubeChannelVideo {
  id: string
  title: string
  url: string
  publishedAt: string
  thumbnail: string
  description: string
  views: number
  author: {
    name: string
    url: string
  }
}

export interface YouTubeChannelFeed {
  channelId: string
  title: string
  videos: YouTubeChannelVideo[]
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getTagContent(xml: string, tag: string): string {
  const escapedTag = escapeRegex(tag)
  const regex = new RegExp(`<${escapedTag}(?:[^>]*)>([\\s\\S]*?)<\\/${escapedTag}>`)
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function getAttribute(xml: string, tag: string, attr: string): string {
  const escapedTag = escapeRegex(tag)
  const escapedAttr = escapeRegex(attr)
  const regex = new RegExp(`<${escapedTag}[^>]*\\s${escapedAttr}="([^"]*)"`)
  const match = xml.match(regex)
  return match ? match[1] : ''
}

function getAllTagMatches(xml: string, tag: string): string[] {
  const escapedTag = escapeRegex(tag)
  const regex = new RegExp(`<${escapedTag}(?:[^>]*)>[\\s\\S]*?<\\/${escapedTag}>`, 'g')
  return xml.match(regex) ?? []
}

/**
 * Fetches the YouTube channel RSS feed and returns parsed video data.
 *
 * @param channelId - The YouTube channel ID (required). You can find it in the
 *   channel URL: `https://www.youtube.com/channel/<channelId>`
 */
export async function fetchYouTubeChannelFeed(channelId: string): Promise<YouTubeChannelFeed> {
  if (!channelId) {
    throw new Error('[nuxt-email-renderer] YouTube channel ID is required')
  }

  const url = `${YOUTUBE_RSS_BASE_URL}?channel_id=${encodeURIComponent(channelId)}`

  let response: Response
  try {
    response = await fetch(url)
  }
  catch (cause) {
    throw new Error(
      `[nuxt-email-renderer] Network error while fetching YouTube channel feed for channel "${channelId}": ${(cause as Error).message}`,
      { cause },
    )
  }

  if (!response.ok) {
    throw new Error(
      `[nuxt-email-renderer] Failed to fetch YouTube channel feed for channel "${channelId}": ${response.status} ${response.statusText}`,
    )
  }

  const xmlText = await response.text()

  // Extract the channel-level title by stripping <entry> blocks first
  const feedXmlWithoutEntries = xmlText.replace(/<entry[\s\S]*?<\/entry>/g, '')
  const channelTitle = getTagContent(feedXmlWithoutEntries, 'title')

  const entries = getAllTagMatches(xmlText, 'entry')

  const videos: YouTubeChannelVideo[] = entries.map((entry) => {
    const videoId = getTagContent(entry, 'yt:videoId')
    const title = getTagContent(entry, 'title')
    const publishedAt = getTagContent(entry, 'published')
    const thumbnail = getAttribute(entry, 'media:thumbnail', 'url')
    const description = getTagContent(entry, 'media:description')

    const viewsMatch = entry.match(/<media:statistics\s[^>]*\bviews="(\d+)"/)
    const views = viewsMatch ? Number.parseInt(viewsMatch[1], 10) : 0

    const authorBlock = getTagContent(entry, 'author')
    const authorName = getTagContent(authorBlock, 'name')
    const authorUrl = getTagContent(authorBlock, 'uri')

    return {
      id: videoId,
      title,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt,
      thumbnail,
      description,
      views,
      author: {
        name: authorName,
        url: authorUrl,
      },
    }
  })

  return {
    channelId,
    title: channelTitle,
    videos,
  }
}
