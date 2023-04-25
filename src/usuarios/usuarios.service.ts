import { Status } from './../entities/Status';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Usuarios } from '../entities/Usuarios';
import { Login } from './usuarios.controller';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuarios)
    private usuariosRP: Repository<Usuarios>,
    @InjectRepository(Status)
    private statusRP: Repository<Status>,
  ) { }

  create(usuario: Usuarios) {
    console.log("usuario = ", usuario)
    const usuario2: Usuarios = {
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      idStatus: usuario.idStatus,
      login: usuario.login,
      nome: usuario.nome,
      nomeMae: usuario.nomeMae,
      senha: usuario.senha,
      dataAlteracao: new Date(),
      dataInclusao: new Date(),
      dataNascimento: (usuario.dataNascimento ? new Date(usuario.dataNascimento) : null),
      email: usuario.email
    }

    const user = this.usuariosRP.create(usuario2);
    return this.usuariosRP.save(user).then(
      value => {
        console.log('value = ', value)
      }
    )
  }

  findAll() {
    return this.usuariosRP.find({
      where: { id: MoreThan(10), idStatus: 3 }
    })
  }

  async login(login: Login) {

    let retorno = {
      erro: true,
      msg: 'Falha ao realizar o login.'
    }

    console.log(login)

    const usuario = await this.usuariosRP.findOne({
      where: {
        login: login.login,
        senha: login.senha,
        idStatus: 3
      }
    })

    console.log(usuario)

    if (usuario) {
      retorno.erro = false;
      retorno.msg = 'Login realizado com sucesso'
    }

    return retorno
  }

  findAllStatus() {
    return this.statusRP.find()
  }

  update(id: number, usuario: Usuarios) {

    console.log("chegou no update = ", usuario)

    const usuario2: Usuarios = {
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      idStatus: usuario.idStatus,
      login: usuario.login,
      nome: usuario.nome,
      nomeMae: usuario.nomeMae,
      senha: usuario.senha,
      dataAlteracao: new Date(),
      dataInclusao: new Date(usuario.dataInclusao),
      dataNascimento: (usuario.dataNascimento ? new Date(usuario.dataNascimento) : null),
      email: usuario.email
    }

    const user = this.usuariosRP.create(usuario2);
    return this.usuariosRP.update({ id: id }, user).then(
      value => {
        console.log("saiu no update = ", usuario)
      }
    )
  }

  remove(id: number) {
    return this.usuariosRP.createQueryBuilder('usuarios')
      .update()
      .set({ idStatus: 2 })
      .where(`id = :idUsuario`, { idUsuario: id })
      .execute().then(exclusao => {
        console.log("exclusao = ", exclusao)
      })
  }

  removeAll() {
    return this.usuariosRP.createQueryBuilder('usuarios')
      .update()
      .set({ idStatus: 2 })
      .where(`idStatus = 1`)
      .orWhere(`idStatus = 3`)
      .execute().then(exclusao => {
        console.log("exclusao = ", exclusao)
      })
  }

  async filtro(filtro: Filtro){

    console.log("filtro = ", filtro)

    const usuarios = this.usuariosRP.createQueryBuilder('usuarios')
      .leftJoin('usuarios.idStatus2', "idStatus2")
      
    if(filtro.idStatus){
      usuarios.where("idStatus2.id = :idStatus", {idStatus: filtro.idStatus})
    }

    const todosUsuarios = await usuarios.getMany()

    let todosUsuariosFiltrados2 = []

    console.log('qtd = ', todosUsuarios.length)

    const todosUsuariosFiltrados = todosUsuarios.filter( usuario => {

      if(filtro.nome){
        if(!(usuario.nome)?.includes(filtro.nome)) return
      }

      if(filtro.cpf){
        if(!(usuario.cpf)?.includes(filtro.cpf)) return
      }
      
      if(filtro.login){
        if(!(usuario.login)?.includes(filtro.login)) return
      }

      console.log("passou aqui")

      if(filtro.periodoNascimentoInicial){
        const dataFiltro = new Date(filtro.periodoNascimentoInicial)
        const dataUsuario = new Date(usuario?.dataNascimento)
        // console.log("dataFiltro =  ", dataFiltro)
        // console.log("dataUsuario =  ", dataUsuario)
        if(dataUsuario < dataFiltro) return
      }

      if(filtro.periodoInsercaoInicial){
        const dataFiltro = new Date(filtro.periodoInsercaoInicial)
        const dataUsuario = new Date(usuario?.dataInclusao)
        if(dataUsuario < dataFiltro) return
      }

      if(filtro.periodoAlteracaoInicial){
        const dataFiltro = new Date(filtro.periodoAlteracaoInicial)
        const dataUsuario = new Date(usuario.dataAlteracao)
        if(dataUsuario < dataFiltro) return
      }

      if(filtro.periodoNascimentoFinal){
        const dataFiltro = new Date(filtro.periodoNascimentoFinal)
        const dataUsuario = new Date(usuario?.dataNascimento)
        if(dataUsuario > dataFiltro) return
      }

      if(filtro.periodoInsercaoFinal){
        const dataFiltro = new Date(filtro.periodoInsercaoFinal)
        const dataUsuario = new Date(usuario?.dataInclusao)
        if(dataUsuario > dataFiltro) return
      }

      if(filtro.periodoAlteracaoFinal){
        const dataFiltro = new Date(filtro.periodoAlteracaoFinal)
        const dataUsuario = new Date(usuario.dataAlteracao)
        if(dataUsuario > dataFiltro) return
      }

      return usuario

    })

    return todosUsuariosFiltrados
  }
}

export interface Filtro {
  nome?: string;
  cpf?: string;
  login?: string;
  idStatus?: number;
  periodoNascimentoInicial?: string;
  periodoNascimentoFinal?: string;
  periodoInsercaoInicial?: string;
  periodoInsercaoFinal?: string;
  periodoAlteracaoInicial?: string;
  periodoAlteracaoFinal?: string;
  idFaixaEtaria?: number;
}
