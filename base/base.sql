create database cursos;

create table curso(
    id_c int AUTO_INCREMENT primary key,
    nombre_c varchar(30) not null,
    descripcion varchar(100)not null
);

create table usuarios(
    id_u int AUTO_INCREMENT primary key,
    nombre_u varchar(50) not null
);

create table inscripciones(
    id_i int AUTO_INCREMENT primary key,
    id_ic int,
    id_iu int,
    foreign key (id_ic) references curso(id_c) ON DELETE SET NULL,
    foreign key (id_iu) references usuarios(id_u) ON DELETE SET NULL
);


insert into curso (nombre_c, descripcion) values ('Mecanica', 'En este curso se dara la mecanica automotriz');
insert into curso (nombre_c, descripcion) values ('Electronica', 'En este curso se dara la electronica digital');

insert into usuarios (nombre_u) values ('Juan Manuel Perez Ortiz');
insert into usuarios (nombre_u) values ('Omar Garrido Mora');

insert into inscripciones  (id_ic, id_iu)values (1, 1);
insert into inscripciones  (id_ic, id_iu)values (1, 2);
insert into inscripciones  (id_ic, id_iu)values (2, 1);
insert into inscripciones  (id_ic, id_iu)values (2, 2);