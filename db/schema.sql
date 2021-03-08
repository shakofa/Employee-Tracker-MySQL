DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

/*database name*/
USE employees;



/*create 3 tables*/
CREATE TABLE department (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id),
);


CREATE TABLE role (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL,
    INDEX fk_department (fk_department) FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
    PRIMARY KEY (id),
);



CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,  
    INDEX role_id (role_id),
    CONSTRAINT fK_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INTEGER UNSIGNED,
    INDEX manager_id (manager_id),
    CONSTRAINT fK_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id),
);
