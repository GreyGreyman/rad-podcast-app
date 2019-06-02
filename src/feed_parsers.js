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
  episodes = episodes.slice(0, 15);


  let description = [
    doc.querySelector('channel > description') ? doc.querySelector('channel > description').textContent : '',
    doc.querySelector('channel > summary') ? doc.querySelector('channel > summary').textContent : '',
  ]
  description = description.reduce((max, string) => string.length > max.length ? string : max);

  let image = doc.querySelector('image[href]').getAttribute('href');
  
  const podcast = {
    title: doc.querySelector('title').textContent,
    artist: doc.querySelector('author').textContent,
    description,
    episodes,
    image
  }
  return podcast;
}