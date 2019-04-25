export function myFeedParser(xml) {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml, 'text/xml');
  const items = doc.querySelectorAll('item');

  let episodes = Array.from(items).map((episode) =>
    ({
      title: episode.querySelector('title').textContent,
      link: episode.querySelector('enclosure').getAttribute('url')
    })
  );

  let description = [
    doc.querySelector('channel > description') ? doc.querySelector('channel > description').textContent : '',
    doc.querySelector('channel > summary') ? doc.querySelector('channel > summary').textContent : '',
  ]
  description = description.reduce((max, string) => string.length > max.length ? string : max);

  episodes = episodes.slice(0, 15);

  const podcast = {
    title: doc.querySelector('title').textContent,
    artist: doc.querySelector('author').textContent,
    description,
    episodes,
  }
  return podcast;
}