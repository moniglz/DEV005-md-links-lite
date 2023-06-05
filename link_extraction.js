const extractLinks = (mdContent) => {
  const linkRegExp = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegExp.exec(mdContent)) !== null) {
    links.push({
      href: match[2],
      text: match[1],
    });
  }

  return links;

};

module.exports = extractLinks;
