import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../entities/Usuarios';
import { Status } from '../entities/Status';
import { FaixaEtaria } from '../entities/FaixaEtaria';

@Module({
  controllers: [UsuariosController],
  imports: [
    TypeOrmModule.forFeature([
      Usuarios,
      Status,
      FaixaEtaria
    ])
  ],
  providers: [UsuariosService]
})
export class UsuariosModule {}
