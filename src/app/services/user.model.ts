/*****************************************
 * User interface (model)
 * Represents a logged in google user
 ****************************************/
export interface User {

    /** user Id */
    uid: string;

    /** user emal */
    email: string;

    /** user photo url */
    photoURL?: string;

    /** User's name */
    displayName?: string;
}
