\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS industries CASCADE;
DROP TABLE IF EXISTS companyIndustry CASCADE;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
  code text PRIMARY KEY,
  industry text
);

CREATE TABLE companyIndustry (
  comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
  industry_code text NOT NULL REFERENCES industries ON DELETE CASCADE
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries
  VALUES ('acct', 'Accounting'),
  ('sgood', 'Spoorting Goods'),
  ('cre', 'Commercial Real Estate'), 
  ('grc', 'Grocery');

INSERT INTO companyIndustry
  VALUES ('apple','acct'),
  ('ibm','cre');
