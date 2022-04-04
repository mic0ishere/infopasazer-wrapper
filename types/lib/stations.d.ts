declare namespace _default {
    export { searchStations };
    export { getAllStations };
}
export default _default;
/**
 * Station.
 */
export type Station = {
    /**
     * Station name.
     */
    name: string;
    /**
     * Station id.
     */
    id: number;
};
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
declare function searchStations(query: string): Promise<Station[]>;
/**
 * Get all station in Poland.
 * @function getAllStations
 * @returns {Promise<Station[]>}
 * @async
 */
declare function getAllStations(): Promise<Station[]>;
