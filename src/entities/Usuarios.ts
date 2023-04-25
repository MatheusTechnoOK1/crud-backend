import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "./Status";

@Index("id_UNIQUE", ["id"], { unique: true })
@Index("fk_status_idx", ["idStatus"], {})
@Entity("usuarios", { schema: "fc" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "nome", nullable: true, length: 45 })
  nome: string | null;

  @Column("varchar", { name: "cpf", nullable: true, length: 45 })
  cpf: string | null;

  @Column("varchar", { name: "login", nullable: true, length: 45 })
  login: string | null;

  @Column("int", { name: "id_status", nullable: true })
  idStatus: number | null;

  @Column("varchar", { name: "senha", nullable: true, length: 255 })
  senha: string | null;

  @Column("date", { name: "data_nascimento", nullable: true })
  dataNascimento: Date | null;

  @Column("varchar", { name: "nome_mae", nullable: true, length: 255 })
  nomeMae: string | null;

  @Column("varchar", { name: "telefone", nullable: true, length: 45 })
  telefone: string | null;

  @Column("datetime", { name: "data_inclusao", nullable: true })
  dataInclusao: Date | null;

  @Column("datetime", { name: "data_alteracao", nullable: true })
  dataAlteracao: Date | null;

  @Column("varchar", { name: "email", nullable: true, length: 85 })
  email: string | null;

  @ManyToOne(() => Status, (status) => status.usuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_status", referencedColumnName: "id" }])
  idStatus2?: Status;
}
