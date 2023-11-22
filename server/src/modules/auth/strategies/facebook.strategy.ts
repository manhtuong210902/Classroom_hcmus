// facebook.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile,VerifyCallback } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('FACEBOOK_APP_ID'),
            clientSecret: configService.get('FACEBOOK_APP_SECRET'),
            callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
            profileFields: ['id', 'emails', 'name', 'photos'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<VerifyCallback> {
        try {
            const { photos, name, id } = profile;
    
            const user = {
                facebookId: id,
                photo : photos[0].value,
                firstName: name.familyName,
                lastName: name.givenName,
                accessToken,
            };
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
}
