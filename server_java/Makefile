all: compile

run: pcassembly/Main.class compile
	java -cp '.:postgresql-42.2.25.jar' pcassembly/Main

compile: pcassembly/*.java
	javac pcassembly/Main.java