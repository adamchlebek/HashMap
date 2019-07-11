import { Region } from './region.model';
import { Platform } from './platform.model';
import { CommunicationPlatform } from './communication-platform.model';
import { SteamApp } from 'src/app/services/steam/models/steamApp.model';

export interface Profile {
    uid                     : string;
    displayName             : string;
    regionId                : number;//Region;
    platformId              : number;//Platform;
    communicationPlatformId : number;//CommunicationPlatform;
    days                    : number[];
    steamApps               : number[];//SteamApp[];
    bio                     : string;
}