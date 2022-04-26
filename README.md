# PC Assemby wizard

<img src="media/java_login.png">

## About the project

A website to quickly view and compare PC parts like CPUs, Motherboards, GPUs, etc. from across the web in one place

## How to run

Clone the repository:

```bash
git clone https://github.com/AdityaNG/PC-Assemby-wizard
git checkout OOAD
```

Create the database:

```bash
sudo -u postgres -i
# Use the full path to the everything.sql file
psql < /home/aditya/LABS/PC-Assemby-wizard/sql_gen/everything.sql
```

Compile and run the app:

```bash
make run
```