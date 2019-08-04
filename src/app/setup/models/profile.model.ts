import { SteamApp } from 'src/app/services/steam/models/steamApp.model';

/*******************************
 * Profile interface (model)
 ******************************/
export interface Profile {
    /** Profile Id */
    uid: string;

    /** Prodile Display Name */
    displayName: string;

    /** Profile's region */
    regionId: number;

    /** Profile's Platform */
    platformId: number;

    /** Profile's Communication Platform */
    communicationPlatformId: number;

    /** Profile's available Days */
    days: number[];

    /** Profile's game interests */
    steamApps: number[];

    /** Profile's bio */
    bio: string;

    /** List of steam app chips (client side only) */
    _steamAppChips: SteamApp[];
}
