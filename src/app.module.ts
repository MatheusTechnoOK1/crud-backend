import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/Usuarios';
import { Status } from './entities/Status';
import { FaixaEtaria } from './entities/FaixaEtaria';

@Module({
  imports: [
    UsuariosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        Usuarios,
        Status,
        FaixaEtaria
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Usuarios,
      Status,
      FaixaEtaria
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
