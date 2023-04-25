import { Column, Entity, OneToMany } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("status", { schema: "fc" })
export class Status {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "descricao", nullable: true, length: 45 })
  descricao: string | null;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.idStatus2)
  usuarios: Usuarios[];
}
