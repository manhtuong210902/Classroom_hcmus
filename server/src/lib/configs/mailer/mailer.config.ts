import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
    constructor(private configService: ConfigService) { }

    createMailerOptions(): MailerOptions {
        return {
            transport: {
                host: this.configService.get<string>('MAILER_HOST'),
                auth: {
                    user: this.configService.get<string>('MAILER_AUTH_USER'),
                    pass: this.configService.get<string>('MAILER_AUTH_PASS')
                }
            },
            defaults: {
                from: '"No Reply" <noreply@classroom.com>',
            }
        }
    }
}

