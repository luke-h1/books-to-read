import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { isProd } from '../shared/isProd';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '123',
      signOptions: {
        expiresIn: isProd ? '5d' : '1d',
      },
    }),
    UserModule,
  ],
})
export class AuthModule {}
