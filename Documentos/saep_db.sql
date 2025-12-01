CREATE DATABASE saep_db;

CREATE TABLE produto (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    descricao TEXT,
    quantidade INT,
    preco FLOAT(6,2),
    estoque_minimo INT
);

CREATE TABLE movimnetacao (
	id INT PRIMARY KEY AUTO_INCREMENT,
	produto_id INT,
    tipo VARCHAR(10),
    quantidade INT,
    usuario_id INT,
    data_operacao DATETIME,
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

INSERT INTO produto (nome, descricao, quantidade, preco, estoque_minimo) VALUES
('Teclado Mecânico', 'Teclado mecânico RGB com switches azuis', 50, 299.90, 10),
('Mouse Gamer', 'Mouse gamer com sensor 16000 DPI', 100, 149.90, 20),
('Monitor 24"', 'Monitor Full HD 24 polegadas', 30, 899.00, 5),
('Cadeira Gamer', 'Cadeira ergonômica com apoio para cabeça', 20, 1299.00, 3);

INSERT INTO movimnetacao (produto_id, tipo, quantidade, usuario_id, data_operacao) VALUES
(1, 'entrada', 20, 1, '2025-12-01 10:00:00'),
(2, 'entrada', 50, 2, '2025-12-01 11:00:00'),
(1, 'saida', 5, 1, '2025-12-02 09:30:00'),
(3, 'entrada', 10, 3, '2025-12-02 14:00:00'),
(4, 'saida', 2, 2, '2025-12-03 16:20:00');