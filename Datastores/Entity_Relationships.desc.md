## Objectives

- Explain what an entity relationship diagram is.
- Explain why an entity relationship diagram is useful.
- Explain what PostgreSQL column constraints are.
- Use PostgreSQL column constraints to implement an entity relationship diagram.
- Explain what a join statement is.
- Explain why a join statement is useful.
- Alias columns and tables in SQL `SELECT` statements.
- Write inner join statements.

## What's an entity relationship diagram?

An **entity relationship diagram** (ER diagram) is a drawing that represents people, places, or things that are inter-related. As the name suggests, an ER diagram is composed of entities and the relationships that can exist between them. Here's an ER diagram that represents movie, award, and plot entities and their relationships.

```text
┌──────────────┐       ┌─────────────────┐       ┌──────────────┐       ┌──────────────┐
│              │      ╱│                 │╲      │              │      ╱│              │
│    actors    │───────│  actors_movies  │───────│    movies    │───────│    awards    │
│              │      ╲│                 │╱      │              │      ╲│              │
└──────────────┘       └─────────────────┘       └──────────────┘       └──────────────┘
                                                        │
                                                        │
                                                        │
                                                 ┌─────────────┐
                                                 │             │
                                                 │    plots    │
                                                 │             │
                                                 └─────────────┘
```

This ER diagram uses crow's foot notation to specify the relationship cardinalities. **Relationship cardinality** is just a fancy term that means the number of related entities in a relationship. There are three distinct relationship cardinality types.

- One-to-one relationship
- One-to-many relationship
- Many-to-many relationship

A **one-to-one** relationship describes the relationship between two entities where an entity from group `A` may only be linked to an entity of group `B` and vice versa. For example, think of movies as group `A` and plots as group `B`. A movie has only one plot and a plot has only one movie, if it's a good movie.

```text
┌──────────────┐       ┌─────────────┐
│              │       │             │
│    movies    │───────│    plots    │
│              │       │             │
└──────────────┘       └─────────────┘
```

A **one-to-many** relationship describes the relationship between two entities where an entity from group `A` may be linked to many entities from group `B`, but a entity from group `B` is linked to only one entity of group `A`. For example, think of movies as group `A` and awards as group `B`. A movie can have many awards, but an award can only be given to one movie (per year).

```text
┌──────────────┐       ┌──────────────┐
│              │      ╱│              │
│    movies    │───────│    awards    │
│              │      ╲│              │
└──────────────┘       └──────────────┘
```

A **many-to-many** relationship describes the relationship between two entities where many entities of group `A` may be linked to many entities of group `B` and vice versa. For example, think of movies as group `A` and actors as group `B`. An actor can star in many movies and a movie can have many actors.

```text
┌──────────────┐       ┌─────────────────┐       ┌──────────────┐
│              │      ╱│                 │╲      │              │
│    actors    │───────│  actors_movies  │───────│    movies    │
│              │      ╲│                 │╱      │              │
└──────────────┘       └─────────────────┘       └──────────────┘
```

As you can see here, a many-to-many relationship is the combination of two one-to-many relationships connected to an **associative entity** in the middle. We'll talk more about associative entities in a bit.

### Exercise

With your neighbors, draw an ER diagram to represent the relationship between pet entities and species entities.

Once you're satisfied with this, add owner entities to the diagram and draw their relationship with pet entities.

Once you're satisfied with this, add one more entity of your choosing to the diagram and draw their relationship with the other entities as appropriate.

## Why is an entity relationship diagram useful?

An ER diagram is the result of analyzing a problem domain to better understand how its entities and their relationships exist over time. The processes that modify entities and their relationships can often be hard to describe in words. For example, how do you describe the programming logic of a movie winning an award to a person who doesn't understand how to code (e.g. you future boss)? An ER diagram can be useful to represent these processes graphically.

Additionally, an ER diagram is often created to represent the persistence needs of a new feature in a web application. Typically, creating an ER diagram is the first step toward forming a relational database structure for the feature. In a relational database, the relationships between entities are implemented by storing the primary key of one entity as a foreign key in the table of another entity.

In a relational database, a **primary key** is the unique identifier of a table row, usually the `id` column. While other tables may use the same value, the primary key for every row in the same table is guaranteed to be unique and never reused. A **foreign key** is the unique identifier of a row stored in a foreign key column of another table. The name of a foreign key column is usually the singular form of the entity's table name with an `_id` suffix. For example, the `movie_id` foreign key column that references the `id` primary key column of the `movies` tables.

In a one-to-many relationship, the primary key of one table row is stored as the foreign key in another table row. The way you determine which table gets the foreign key column is to look at the crow's foot in the ER diagram. The crow's foot touches is the table the needs the foreign key column. In a one-to-one relation, any of the two tables can have the foreign key column, but only one of them needs to have it.

Here's an example ER diagram that represents the relationship between movies and awards in more detail.

```text
┌──────────────┐       ┌──────────────┐
│    movies    │       │    awards    │
│──────────────│       │──────────────│
│ id           │       │ id           │
│ title        │       │ movie_id     │
│ duration     │      ╱│ kind         │
│ rating       │───────│ name         │
│ genre        │      ╲│              │
│ is_3d        │       │              │
│ released_at  │       │              │
│ score        │       │              │
└──────────────┘       └──────────────┘
```

Using the diagram, it's easy to see how you'd create the `movies` and `awards` tables. Here are some example `CREATE TABLE` commands that'll create tables based on the above ER diagram.

```sql
CREATE TABLE movies (
  id serial,
  title text,
  duration integer,
  rating varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);

CREATE TABLE awards (
  id serial,
  movie_id integer,
  kind varchar(50),
  name text
);
```

And with the tables defined, it's easy to see how you'd insert some rows into them. Here are some an example `INSERT` commands insert rows into the tables from above.

```sql
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score)
VALUES ('Frozen', 102, 'PG', 'Animation', 't', '2013-11-26 16:00:00-08', 7.6);

INSERT INTO awards (movie_id, kind, name)
VALUES (1, 'Oscar', 'Best Animated Feature Film of the Year');

INSERT INTO awards (movie_id, kind, name)
VALUES (1, 'Oscar', 'Best Achievement in Music Written for Motion Pictures, Original Song');
```

Here's the above movie entity's unique identifier being stored as the `id` primary key in the `movies` table.

```text
 id | title  | duration | rating |   genre   | is_3d |      released_at       | score
----+--------+----------+--------+-----------+-------+------------------------+-------
  1 | Frozen |      102 | PG     | Animation | t     | 2013-11-26 16:00:00-08 |   7.6
```

And here's the same movie entity's unique identifier being stored as the `movie_id` foreign key in the `awards` table for two award entities.

```text
 id | movie_id | kind  |                                 name                                 
----+----------+-------+----------------------------------------------------------------------
  1 |        1 | Oscar | Best Animated Feature Film of the Year                               
  2 |        1 | Oscar | Best Achievement in Music Written for Motion Pictures, Original Song
```

### Exercise

With your neighbors, add some attributes to the pet-based ER diagram that you created earlier.

Once you're satisfied with the diagram, write a `CREATE TABLE` SQL command for each entity.

Once you're satisfied with the tables, write some `INSERT` SQL commands to seed each table.

## What are PostgreSQL column constraints?

Data types are a way to limit the kind of information that can be stored in a table. For many web applications, however, the constraints they provide are not strict enough. It's common for web applications to constrain column data with respect to other columns or rows. For example, in a table containing product information, there should be only one row for each product number.

To that end, PostgreSQL allows you to define **column constraints** on tables. Constraints give you as much control over the data in your tables as you wish. If an application attempts to store data in a column that would violate a constraint, an error is raised.

The PostgreSQL column constraints useful for entity relationships are the following.

1. Not-null constraints
1. Unique constraints
1. Primary key constraints
1. Foreign key constraints

A **not-null constraint** simply specifies that a column must not assume the null value. A table can have more than one column with a not-null constraint.

**NOTE:** The `serial` data type automatically adds not-null constraint to the column.

```sql
CREATE TABLE movies (
  id serial,
  title text,
  is_3d boolean NOT NULL
);
```

A **unique constraint** ensures that the data contained in a column is unique among all the rows in the table. Adding a unique constraint automatically creates a unique index on the column, which is something we'll discuss later. A table can have more than one column with a unique constraint.

```sql
CREATE TABLE movies (
  id serial UNIQUE,
  title text,
  is_3d boolean NOT NULL
);
```

A **primary key constraint** indicates that a column can be used as a unique identifier for rows in the table. This constraint requires the values in the primary key column to be both unique and not null. Adding a primary key constraint automatically creates a unique index on the column, which is something we'll discuss later. A table can only have one column with a primary key constraint.

```sql
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text,
  is_3d boolean NOT NULL
);
```

A **foreign key constraint** specifies that the values in a column must match the values appearing in some row of another table. This constraint is used to maintain the referential integrity between two related tables. A table can have more than one column with a foreign key constraint. A foreign key constraint can also cascade the deletion of its specified row. In other words, when the referenced row is deleted, the row(s) referencing it should be automatically deleted as well.

**NOTE:** Typically, a foreign key has a not-null constraint to prevent orphaned entities from being inserted.

```sql
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text,
  is_3d boolean NOT NULL
);

CREATE TABLE awards (
  id serial PRIMARY KEY,
  movies_id integer NOT NULL REFERENCES movies ON DELETE CASCADE,
  name text
);
```

### Exercise

Write down the four PostgreSQL column constraints and explain each one in your own words. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## How do you use PostgreSQL column constraints to implement an entity relationship diagram.

```shell
dropdb movie_junkies_dev
createdb movie_junkies_dev
psql movie_junkies_dev
```

In a relational database system, a one-to-one relationship exists when one row in table A is linked with only one row in table B.

```sql
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text,
  duration integer,
  rating varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);

CREATE TABLE plots (
  id serial PRIMARY KEY,
  movie_id integer UNIQUE NOT NULL REFERENCES movies ON DELETE CASCADE,
  summary text
);
```

[INSPECT THE CREATE TABLES]

```SQL
INSERT INTO movies (id, title, duration, rating, genre, is_3d, released_at, score)
VALUES (1, 'Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);

INSERT INTO movies (id, title, duration, rating, genre, is_3d, released_at, score)
VALUES (2, 'X-Men: Apocalypse', 144, 'PG-13', 'Action', TRUE, '2016-05-27 00:00:00 UTC', 7.4);

INSERT INTO movies (id, title, duration, rating, genre, is_3d, released_at, score)
VALUES (3, 'The Princess Bride', 98, 'PG', 'Adventure', FALSE, '1987-10-09 00:00:00 UTC', 8.1);

INSERT INTO movies (id, title, duration, rating, genre, is_3d, released_at, score)
VALUES (4, 'Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);

INSERT INTO plots (id, movie_id, summary) VALUES (1, 1, 'Anna, a fearless optimist, sets off on an epic journey - teaming up with rugged mountain man Kristoff and his loyal reindeer Sven - to find her sister Elsa, whose icy powers have trapped the kingdom of Arendelle in eternal winter. Encountering Everest-like conditions, mystical trolls and a hilarious snowman named Olaf, Anna and Kristoff battle the elements in a race to save the kingdom. From the outside Anna''s sister, Elsa looks poised, regal and reserved, but in reality, she lives in fear as she wrestles with a mighty secret-she was born with the power to create ice and snow. It''s a beautiful ability, but also extremely dangerous. Haunted by the moment her magic nearly killed her younger sister Anna, Elsa has isolated herself, spending every waking minute trying to suppress her growing powers. Her mounting emotions trigger the magic, accidentally setting off an eternal winter that she can''t stop. She fears she''s becoming a monster and that no one, not even her sister, can help her.');

INSERT INTO plots (id, movie_id, summary) VALUES (2, 2, 'Since the dawn of civilization, he was worshipped as a God. Apocalypse, the first and most powerful mutant from Marvel''s X-Men universe, amassed the powers of many other mutants, becoming immortal and invincible. Upon awakening after thousands of years, he is disillusioned with the world as he finds it and recruits a team of powerful mutants, including a disheartened Magneto, to cleanse mankind and create a new world order, over which he will reign. As the fate of the Earth hangs in the balance, Raven with the help of Professor X must lead a team of young X-Men to stop their greatest nemesis and save mankind from complete destruction.');

INSERT INTO plots (id, movie_id, summary) VALUES (3, 3, 'A kindly grandfather sits down with his ill grandson and reads him a story. The story is one that has been passed down from father to son for generations. As the grandfather reads the story, the action comes alive. The story is a classic tale of love and adventure as the beautiful Buttercup, engaged to the odious Prince Humperdinck, is kidnapped and held against her will in order to start a war, It is up to Westley (her childhood beau, now returned as the Dread Pirate Roberts) to save her. On the way he meets a thief and his hired helpers, an accomplished swordsman and a huge, super strong giant, both of whom become Westley''s companions in his quest.');

INSERT INTO plots (id, movie_id, summary) VALUES (4, 4, 'Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his next fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.');
```

[INSPECT INSERTED ROWS, PLAY WITH CONSTRAINTS]

In a relational database, a one-to-many relationship exists when one row in table A is linked with many rows in table B, but one row in table B is linked to only one row in table A.

```sql
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text,
  duration integer,
  rating varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);

CREATE TABLE awards (
  id serial PRIMARY KEY,
  movie_id integer NOT NULL REFERENCES movies ON DELETE CASCADE,
  kind text,
  name text
);
```

[PLAY WITH INSERTING ROWS INTO THE COLUMN]

In a relational database management system, a many-to-many relationship is implemented by means of an join table, AB, with two one-to-many relationships. A -> AB and B -> AB. In this case the logical primary key for AB is formed from the two foreign keys.

```sql
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text,
  duration integer,
  rating varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);

CREATE TABLE actors (
  id serial PRIMARY KEY,
  name text,
  bio text,
  birthedAt timestamp with time zone
);

CREATE TABLE actors_movies (
  id serial PRIMARY KEY,
  actor_id integer NOT NULL REFERENCES actors ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES movies ON DELETE CASCADE,
  role text
);
```

[PLAY WITH INSERTING ROWS INTO THE COLUMN]

### Exercise

With your neighbors, add the necessary PostgreSQL column constraints to the `CREATE TABLE` commands you created earlier for your pet-based ER diagram.

## Learn the data model

Suppose we were building an application that allows users to build resumes. In this data model we have tables for

- `users`
- `resumes`
- `employments`
- `employments_resumes`

Logically in our application, each user may have as many employments and resumes as they want. A resume consists of multiple of employments, for which the relationship is stored in `employments_resumes`.

In the next few exercises you'll learn how to join these together.

At the Terminal, clone the following repository and then build a database using the SQL file included:

```shell
git clone git@github.com:gSchool/sql-curriculum.git
cd sql-curriculum/Unit-02-Relational
createdb resume_builder
psql resume_builder -f 01-statements.sql
psql resume_builder
```

So to get more details about these tables, spend some time getting familiar with their structure and where they connect (e.g. spots where we can join data).

To start, run the following commands:

```
psql resume_builder
\dt
\d users
\d resumes
\d employments
\d employment_resumes
```

Just to get into the data model a little, and review your SQL, open the `resume_builder` database with `psql`, and perform the following queries:

1. Select the `first_name` and `last_name` for all `users`.
1. Select all `resumes` (all columns).
1. Select all `employments` for `user_id = 3` and `user_id = 4` (<- would you use an `and` or and `or` here?)

## Selecting with table names / Aliasing

When joining two columns, you'll sometimes need to include two columns that have the same name.  In these cases, you'll need to specify which table it comes from, which looks like this:

```sql
SELECT users.id, users.first_name FROM users;
```

Notice how the output does _not_ include the table name:

```
 id | first_name
----+------------
  1 | Ty
  2 | Joe
  3 | Hank
  4 | Ted
```

Sometimes you'll also want to rename the column, which you can do with an alias, like so:

```sql
SELECT users.id AS user_id, users.first_name FROM users;
```

When you run that, notice that the column name in the output is `user_id`:

```text
 user_id | first_name
---------+------------
       1 | Ty
       2 | Joe
       3 | Hank
       4 | Ted
```

## What's a join statement and why is it useful?

In SQL, a **join statement** combines records from two or more tables in a relational database. The combined records can be viewed or even saved to a new table.

Additionally, you can combine fields from two or more tables by joining on values that are common to each. There are five types of joins, though in this lesson, we'll only cover the first one:

- `INNER JOIN`
- `LEFT OUTER JOIN`
- `RIGHT OUTER JOIN`
- `FULL OUTER JOIN`
- `CROSS JOIN`

As a full stack developer, you'll save data in separate tables and then use joins to get it back together.

## Joins - Syntax

Unlike Mongo and most document databases and key-value stores, in SQL you can easily make a single query that returns data from multiple tables.  The syntax looks like this:

```sql
SELECT * FROM users INNER JOIN employments ON employments.user_id = users.id;
```

In SQL newlines and spacing don't matter, so the same query might look like this:

```sql
SELECT * FROM users
INNER JOIN employments ON employments.user_id = users.id;
```

or this...

```sql
SELECT *
FROM users
INNER JOIN employments
  ON employments.user_id = users.id;
```

Some things in SQL are case-sensitive, like the values in your `where` clauses, but for keywords the case doesn't matter.  So you also might see that same query look like this:

```sql
select *
from users
inner join employments
  on employments.user_id = users.id;
```

Notice that `ON` clause?  It doesn't matter which table is listed on which side, so these two are equivalent:

```sql
SELECT * FROM users INNER JOIN employments ON employments.user_id = users.id;
```

and...

```sql
SELECT * FROM users INNER JOIN employments ON users.id = employments.user_id;
```

## Inner / Left / Right Joins

There are several different ways you can join data.  Three common ways are `INNER JOIN`, `LEFT JOIN` and `RIGHT JOIN`.

Take a few minutes to search the internet for the differences between the three - joins have been around for years, so there's a plethora of great information and articles on what they are / when to use them.

...

Have you searched yet?  No really - go do that :)

You're back?  Awesome - let's talk about how to use them. Here is an image that could be useful:

![SQL JOINS](http://www.codeproject.com/KB/database/Visual_SQL_Joins/Visual_SQL_JOINS_orig.jpg)

In `psql` you can run the previous command by using the up arrow, or using `CTRL+P` (just like the command line).  When you arrow up to a multi-line command, you see the whole command (in multiple lines) and you can use arrow keys to go back through the text.  Use `CTRL+A` to go to the beginning (just like the command line) and `CTRL+E` to go to the end.

## Join'em up!

1. Select all columns from the users table, joined to all columns of the `employments` table.
1. Select `first_name`, `last_name`, `title`, `organization`, `start_year`, and `end_year` from the `users` table joined to the `employments` table.
1. Take the query from above and sort it by the `start_year` ascending. (hint: read this http://www.postgresql.org/docs/9.1/static/queries-order.html)
1. Select `title`, `organization`, `start_year`, and `end_year` from `employments` for `resume_id = 1` (hint: `\d employments_resumes`)

### Three things to note

- The order of the equality doesn't matter: `resumes.id = employment_resumes.resume_id` is equivalent to `employment_resumes.resume_id = resumes.id`.
- When there's a duplicate field name, you need to specify the table name.
- When you are displaying 2 fields with the same name and want to differentiate them in the JOIN, use aliases.

An example of the last two noes:

```sql
SELECT users.id AS user_id, employments.id AS employments_id
FROM users
INNER JOIN employments
  ON employments.user_id = users.id;
```

## Chaining Joins

Every SQL query needs to have a `from` clause.  Once you have table in the `from` clause, you can join onto it.  And you can _also_ join onto tables that have been mentioned in joins, like so:

```sql
SELECT *
FROM comments
INNER JOIN articles ON articles.id = comments.article_id
INNER JOIN authors ON authors.id = articles.author_id
```

Knowing that, now add write a query that

- starts with the `employments_resumes` table
- includes the `id` column from the `employments_resumes` table
- includes the `first_name` and `last_name` columns from the `users` table
- includes the `name` from the `resumes` table
- includes the `start_year` and `end_year` columns from the `employments` table

You know you have it correct when your result set looks like this:

```
id | first_name | last_name |         name         | start_year | end_year
----+------------+-----------+----------------------+------------+----------
 1 | Ty         | Cobb      | First Attempt Resume |       1905 |     1926
 2 | Ty         | Cobb      | First Attempt Resume |       1927 |     1928
 3 | Ty         | Cobb      | First Attempt Resume |       1921 |     1926
 4 | Joe        | DiMaggio  | My only              |       1936 |     1942
 5 | Joe        | DiMaggio  | My only              |       1946 |     1951
 6 | Hank       | Aaron     | My Favorite Rezzy    |       1954 |     1974
 7 | Hank       | Aaron     | My Favorite Rezzy    |       1975 |     1976
 8 | Ted        | Williams  | Player Resume        |       1939 |     1942
 9 | Ted        | Williams  | Player Resume        |       1946 |     1960
10 | Ted        | Williams  | Manager Resume       |       1969 |     1972
```

## Exercises

- [Online Retailer](https://github.com/gSchool/sql-curriculum/blob/solutions/Unit-02-Relational/02-readme.md)

## Resources

- [Lucidchart - ER Diagram Symbols and Meaning](https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning)
- [PostgreSQL Documentation - Constraints](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [Wikipedia - Associative entity](https://en.wikipedia.org/wiki/Associative_entity)
- [Wikipedia - entity relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
- [Wikipedia - Many-to-many (data model)](https://en.wikipedia.org/wiki/Many-to-many_(data_model))
- [Wikipedia - One-to-many (data model)](https://en.wikipedia.org/wiki/One-to-many_(data_model))
- [Wikipedia - One-to-one (data model)](https://en.wikipedia.org/wiki/One-to-one_(data_model))
- [Youtube - Entity Relationship Diagram Training](https://www.youtube.com/watch?v=-fQ-bRllhXc)
- [Youtube - Introduction to Set Theory](https://www.youtube.com/watch?v=yCwnifwVjIg)

## Services

- [Draw.io](https://www.draw.io/)
- [Lucidchart](https://www.lucidchart.com/)

## Videos

### Entity Relationship Diagrams (ERD)

<iframe src="https://player.vimeo.com/video/142034756?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>