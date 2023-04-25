import { Column, Entity } from "typeorm";

@Entity("faixa_etaria", { schema: "fc" })
export class FaixaEtaria {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "limite_inf", nullable: true })
  limiteInf: number | null;

  @Column("int", { name: "limite_sup", nullable: true })
  limiteSup: number | null;

  @Column("varchar", { name: "descricao", nullable: true, length: 100 })
  descricao: string | null;
}
