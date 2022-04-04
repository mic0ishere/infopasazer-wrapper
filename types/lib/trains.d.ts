declare namespace _default {
    export { getTrains };
    export { getTricitySKM };
}
export default _default;
/**
 * Train.
 */
export type Train = {
    /**
     * Train id.
     */
    id: number;
    /**
     * Train carrier.
     */
    carrier: string;
    /**
     * Train departure.
     */
    departure: {
        planned: Date;
        real: Date;
        delay: number;
    };
    /**
     * Route.
     */
    route: {
        name: string;
        start: string;
        end: string;
    };
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
declare function getTrains(id: number): Promise<Train[]>;
/**
 * Get all Tricity SKM's from specific station.
 * @function getTricitySKM
 * @param {number} id
 * @returns {Promise<Train[]>}
 * @async
 */
declare function getTricitySKM(id: number): Promise<Train[]>;
