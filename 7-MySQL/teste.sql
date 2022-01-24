SHOW DATABASES;

CREATE DATABASE sistemaDeCadastro;

USE sistemaDeCadastro;

CREATE TABLE usuarios(
    nome VARCHAR(50), -- "nome" é o nome da coluna, varchar é o tipo de variável, dentro do () vai o número máximo de caracteres 
    email VARCHAR(100),
    idade INT
);

SHOW TABLES;

DESCRIBE usuarios;

INSERT INTO usuarios(nome, email, idade) VALUES(
    "João da Silva",
    "joaosilva@gmail.com",
    24
); 

SELECT * FROM usuarios; -- mostra todos usuarios cadastrados

SELECT * FROM usuarios WHERE idade = 24; -- mostra usuarios com idade = 24

SELECT * FROM usuarios WHERE nome = "João da Silva";

SELECT * FROM usuarios WHERE idade >= 21;

DELETE FROM usuarios WHERE idade = 19;

DELETE FROM usuarios; -- apaga todo o banco de dados!

UPDATE usuarios SET nome = 'Joãozinho'; -- todos nomes viram Joãozinho

UPDATE usuarios SET nome = 'Marcelo da Silva' WHERE nome = 'João da Silva';