/**
 * create excerpt from title
 * @function excerpt
 * @param {any} title
 * @returns {string} title
 */
export function excerpt(title) {
  return title.length > 80 ? `${title.substring(0, 50)} ...` : title;
}

/**
 * removes hyphen from source and capitalize it
 * @method cleanSource
 * @export
 * @param {any} source
 * @returns {string} - Processed source
 */
export function cleanSource(source) {
  const newSource = source.replace('-', ' ');
  return newSource.toUpperCase();
}

/**
 * Get first name from the save user's name
 * @function getFirstName
 * @param {string} string
 * @returns {string} - Returns the first name
 */
export function getFirstName(string) {
  const newString = string.split(' ')[1];
  return `${newString.charAt(0).toUpperCase()}${newString.slice(1)}`;
}

/**
 * Removes `?url=` from the url
 * @function sanitizeUrl
 * @param {string} url
 * @returns {string} - formatted url
 */
export function sanitizeUrl(url) {
  return url.replace('?url=', '');
}

export const stripUrl = url => url.split('/')[2].split('.')[1].replace('-', ' ').toUpperCase();

