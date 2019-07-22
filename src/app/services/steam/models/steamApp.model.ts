
/********************************
 * Steam app interface (model)
 *******************************/
export interface SteamApp {
    /** app Id */
    appid: number;

    /** App's Developer */
    developer: string;

    /** App name */
    name: string;
}
