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
          configService.get<string>('NODE_ENV') === 'production';

        return {
          type: 'postgres' as const,

          ...(isProduction
            ? {
                url: configService.get<string>('DATABASE_URL'),
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : {
                host: configService.get<string>('DB_HOST'),
                port: parseInt(
                  configService.get<string>('DB_PORT') || '5432',
                ),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
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
