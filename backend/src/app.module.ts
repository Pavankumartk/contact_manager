import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactsModule } from './contacts/contacts.module';
import { Contact } from './entities/contact.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get('NODE_ENV') === 'production';

        return {
          type: 'postgres',

          ...(isProduction
            ? {
                url: configService.get('DATABASE_URL'),
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : {
                host: configService.get('DB_HOST'),
                port: parseInt(
                  configService.get<string>('DB_PORT') || '5432',
                ),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
              }),

          entities: [Contact],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),

    ContactsModule,
  ],
})
export class AppModule {}
