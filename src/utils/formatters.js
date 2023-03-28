/**
 * Formats a number to k (when number is >= 1000) or M (when number is >= 1000000).
 * @param {number} num Number to get formatted.
 * @returns {String} Returns the formatted number as a string.
 */
export function numberFormatter(num) {
  // numberFormatter('string'); // TypeError
  if (typeof num !== "number") {
    throw new TypeError(
      `numberFormatter expected number, got ${typeof num} instead.`
    );
  }

  // numberFormatter(1000); // '1.0k'
  if (num >= 1000 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}k`;

    // numberFormatter(1000000); // '1.0M'
  } else if (num >= 1000000 && num < 1000000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  // numberFormatter(999); // '999'
  return String(num);
}

/**
 * Formats a date to dd/mm/yyyy, hh:mm:ss format.
 * @param {Date} date Date to get formatted.
 * @returns {String} Returns the formatted date as a string.
 */
export function dateFormatter(date) {
  const formattedDate = Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(Date.parse(date));

  return formattedDate;
}
