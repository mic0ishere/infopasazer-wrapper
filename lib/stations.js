import { load } from "cheerio";
import fetch from "node-fetch";

/**
 * Station.
 * @typedef {Object} Station
 * @property {string} name Station name.
 * @property {number} id Station id.
 */

/**
 * Search stations.
 * @function searchStations
 * @param {string} query Query to search.
 * @returns {Promise<Station[]>}
 * @async
 */
const searchStations = async (query) => {
  const res = await fetch(
    `http://infopasazer.intercity.pl/?p=stations&q=${query}`
  );

  const html = await res.text();
  const $ = load(html);

  const table = $(
    "body > div > div > div > div > div.border-bottom.pbl.mtm > div > div.table--box > div > div > table > tbody"
  );

  const data = table
    .find("td")
    .map((i, el) => {
      return {
        name: $(el).text().trim(),
        id: $(el).attr("onclick").split("'")[1].split("=")[2],
      };
    })
    .toArray();

  return data;
};

/**
 * Get all station in Poland.
 * @function getAllStations
 * @returns {Promise<Station[]>}
 * @async
 */
const getAllStations = async () => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  const allStations = [];

  for (let i = 0; i < letters.length; i++) {
    const stations = await searchStations(letters[i]);

    allStations.push(...stations);
  }

  return allStations;
};

export default { searchStations, getAllStations };
