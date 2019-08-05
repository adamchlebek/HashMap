import { SteamApp } from 'src/app/services/steam/models/steamApp.model';
import { Region } from './region.model';
import { CommunicationPlatform } from './communication-platform.model';
import { Platform } from './platform.model';

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

    /** Profiles photo */
    photoURL: string;

    /** List of steam app chips (client side only) */
    _steamAppChips: SteamApp[];

    /** friends snapshot */
    friends: any[];

    /** friends list */
    _friends: Profile[];

    /** client side region */
    _region: Region;

    /** client side platform */
    _platform: Platform;

    /** client side comm platform */
    _communicationPlatform: CommunicationPlatform;


}
