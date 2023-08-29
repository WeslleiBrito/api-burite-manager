import { InputGetDatesDTO } from "../dtos/InputGetDates.dto";
import { BaseDatabase } from "./BaseDatabase";
import dotenv from 'dotenv'
dotenv.config()

export class InvoicingDatabase {

    constructor(
        private baseDatabase: BaseDatabase
    ){}
    
    public getInvoicing = async (input: InputGetDatesDTO): Promise<SaleProductsDB[]> => {
        
        const {initialDate, finalDate} = input

        const invoicing: SaleProductsDB[] = await this.baseDatabase.connection("venda_item")
        .select(
            "venda_item.venda",
            "venda.nome",
            "funcionario.fun_nome",
            "venda_item.dtvenda",
            "venda_item.descricao",
            "venda_item.produto",
            "venda_item.vrunitario",
            "venda_item.qtd",
            "venda_item.qtd_devolvida",
            "venda_item.vrcusto_composicao",
            "venda_item.desconto",
            "venda_item.total",
            "subgrupo_produtos.subprod_descricao"
        )
        .whereBetween("venda_item.dtvenda", [initialDate, finalDate])
        .innerJoin("venda", "venda_item.venda", "venda.vend_cod")
        .innerJoin("funcionario", "funcionario.fun_cod", "vendedor")
        .innerJoin("produto", "produto.prod_cod", "venda_item.produto")
        .innerJoin("subgrupo_produtos", "subgrupo_produtos.subprod_cod", "produto.prod_subgrupo")

        return invoicing
    }

    public getNameSubgroups = async (): Promise<string[]> => {
        
        const subgroups: NameSubgroup[] = await this.baseDatabase.connection("subgrupo_produtos").select("subprod_descricao")

        return subgroups.map(subGroup => subGroup.subprod_descricao)
    }

    public getFixedSubroup = async (): Promise<subGroupDB[]> => {
        const invoicing: subGroupDB[] = await this.baseDatabase.connection("venda_item")
        .select(
            "venda_item.vrunitario",
            "venda_item.qtd",
            "venda_item.qtd_devolvida",
            "venda_item.desconto",
            "venda_item.total",
            "produto.prod_subgrupo",
            "subgrupo_produtos.subprod_descricao"
        )
        .whereBetween("venda_item.dtvenda", [process.env.INITIAL_DATE as string, new Date().toISOString()])
        .innerJoin("venda", "venda_item.venda", "venda.vend_cod")
        .innerJoin("produto", "produto.prod_cod", "venda_item.produto")
        .innerJoin("subgrupo_produtos", "subgrupo_produtos.subprod_cod", "produto.prod_subgrupo")
        console.log(invoicing)
        return invoicing
    }
}

export interface subGroupDB {
    qtd: number,
    vrunitario: number,
    qtd_devolvida: number,
    desconto: number,
    total: number,
    subprod_cod: number,
    subprod_descricao: string
}

export interface SaleProductsDB {
    venda: number,
    nome: string,
    dtvenda: string,
    fun_nome: string,
    produto: number,
    descricao: string,
    qtd: number,
    vrunitario: number,
    qtd_devolvida: number,
    vrcusto_composicao: number,
    desconto: number,
    total: number,
    subprod_descricao: string
}

export interface NameSubgroup {
    subprod_descricao: string
}