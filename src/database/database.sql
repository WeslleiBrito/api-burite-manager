-- Active: 1692360260561@@192.168.0.112@3307@clarionerp


SELECT * FROM pagar_rateio;

SELECT * FROM subgrupo_produtos;

SELECT * from tipoconta;

/* Essa query retorna todas os valores de despesa*/
SELECT SUM(pagar_rateio.rateio_vlrparcela) AS total FROM tipoconta INNER JOIN pagar_rateio ON tipoconta.tipocont_descricao = pagar_rateio.rateio_tpcontanome WHERE pagar_rateio.rateio_dtvencimento <= DATE(CURDATE());
/* Essa query retorna o valor de toda despessas fixas*/
SELECT SUM(pagar_rateio.rateio_vlrpagoparcela) AS total, pagar_rateio.rateio_dtvencimento AS "Data de vencimento" FROM tipoconta INNER JOIN pagar_rateio ON tipoconta.tipocont_descricao = pagar_rateio.rateio_tpcontanome WHERE tipoconta.conta_fixa = 1 AND pagar_rateio.rateio_dtvencimento <= DATE(CURDATE());
/*Retorna o valor das compras*/
SELECT SUM(pagar_rateio.rateio_vlrparcela) AS total FROM tipoconta INNER JOIN pagar_rateio ON tipoconta.tipocont_descricao = pagar_rateio.rateio_tpcontanome WHERE tipoconta.conta_fixa = 0 AND pagar_rateio.rateio_tpcontanome = "COMPRAS" AND pagar_rateio.rateio_dtvencimento <= DATE(CURDATE());
SELECT SUM(pagar_rateio.rateio_vlrparcela) AS total FROM tipoconta INNER JOIN pagar_rateio ON tipoconta.tipocont_descricao = pagar_rateio.rateio_tpcontanome WHERE tipoconta.conta_fixa = 0 AND pagar_rateio.rateio_tpcontanome <> "COMPRAS" AND pagar_rateio.rateio_dtvencimento <= DATE(CURDATE());

SELECT * FROM venda_item LIMIT 5;
SELECT SUM(venda_item.qtd * venda_item.vrcusto_composicao) AS "Custo Total" FROM venda_item;

SELECT SUM(pagar_rateio.rateio_vlrparcela) AS "Valor da Parcela" FROM tipoconta
INNER JOIN pagar_rateio ON pagar_rateio.rateio_tipoconta = tipoconta.tipocont_cod WHERE pagar_rateio.rateio_dtvencimento BETWEEN "2020-08-26" AND DATE(CURDATE())  AND tipoconta.conta_fixa = 1; 
SELECT SUM(pagar_rateio.rateio_vlrparcela) AS "Valor da Parcela" FROM tipoconta
INNER JOIN pagar_rateio ON pagar_rateio.rateio_tipoconta = tipoconta.tipocont_cod WHERE pagar_rateio.rateio_dtvencimento BETWEEN "2020-08-26" AND DATE(CURDATE())  AND tipoconta.conta_fixa = 0 AND tipoconta.tipocont_cod <> 79 AND tipoconta.tipocont_cod <> 75; 

