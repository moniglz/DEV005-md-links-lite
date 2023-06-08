const extractLinks = (mdCont, file) => {
  const linkRegExp = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegExp.exec(mdCont)) !== null) {
    links.push({
      href: match[2],
      text: match[1],
      file: file,
    });
  }

  return links;

};

module.exports = extractLinks;
