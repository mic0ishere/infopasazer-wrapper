import { load } from "cheerio";
import fetch from "node-fetch";

/**
 * @function parseHTMLTableElem
 * @private
 * @param {string} tableEl
 * @returns {Array<Object>}
 */
const parseHTMLTableElem = (tableEl) => {
  // https://gist.github.com/johannesjo/6b11ef072a0cb467cc93a885b5a1c19f?permalink_comment_id=3852175#gistcomment-3852175
  const tableLoad = load(tableEl);
  const columns = [
    "numer",
    "przewoznik",
    "data",
    "relacja",
    "odjazd",
    "opoznienie",
  ];
  const rows = tableLoad("tbody > tr");

  return rows
    .map((i, row) => {
      const cells = tableLoad(row).find("td");
      return columns.reduce((obj, col, idx) => {
        obj[col] = tableLoad(cells[idx]).text().trim();
        return obj;
      }, {});
    })
    .toArray();
};

/**
 * Train.
 * @typedef {Object} Train
 * @property {number} id Train id.
 * @property {string} carrier Train carrier.
 * @property {Object} departure Train departure.
 * @property {Date} departure.planned Planned departure time.
 * @property {Date} departure.real Real departure time (with delay).
 * @property {number} departure.delay Delay in seconds.
 * @property {Object} route Route.
 * @property {string} route.name Route name.
 * @property {string} route.start Route start.
 * @property {string} route.end Route end.
 */

/**
 * Get trains from specific station.
 * @function getTrains
 * @param {number} id
 * @returns {Promise<Train[]>}
 * @async
 */
const getTrains = async (id) => {
  const res = await fetch(
    `https://infopasazer.intercity.pl/?p=station&id=${id}`
  );
  const html = await res.text();
  const $ = load(html);
  const table = $(
    "body > div > div > div > div > div:nth-child(9) > div > div.table--box > div > div"
  ).html();

  const data = parseHTMLTableElem(table);

  const final = data.map((x) => {
    const { numer, przewoznik, data, relacja, odjazd, opoznienie } = x;

    const delay_seconds = opoznienie.split(" ")[0] * 60;
    const planned_departure = new Date(`${data} ${odjazd}`);

    return {
      id: numer,
      carrier: przewoznik,
      departure: {
        planned: planned_departure,
        real: new Date(planned_departure.getTime() + delay_seconds * 1000),
        delay: delay_seconds,
      },
      route: {
        name: relacja,
        start: relacja.split(" - ")[0],
        end: relacja.split(" - ")[1],
      },
    };
  });

  return final;
};

/**
 * Get all Tricity SKM's from specific station.
 * @function getTricitySKM
 * @param {number} id
 * @returns {Promise<Train[]>}
 * @async
 */
const getTricitySKM = async (id) => {
  const data = await getTrains(id);

  const skm = data.filter((x) => x.carrier.includes("PKP SKM w Trójmieście"));
  return skm;
};

export default { getTrains, getTricitySKM };
