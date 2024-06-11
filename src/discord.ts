export interface DiscordResponse {
    app_permissions: string;
    application_id: string;
    authorizing_integration_owners: AuthorizingIntegrationOwners;
    entitlements: any[];
    id: string;
    token: string;
    type: number;
    user: User;
    version: number;
}

export interface AuthorizingIntegrationOwners {
}

export interface User {
    avatar: string;
    avatar_decoration_data: null;
    bot: boolean;
    clan: null;
    discriminator: string;
    global_name: string;
    id: string;
    public_flags: number;
    system: boolean;
    username: string;
}
