all: compile

run: compile
	java -cp '.:postgresql-42.2.25.jar' pcassembly/Main

compile: pcassembly/*.java pcassembly/*/*.java
	javac pcassembly/Main.java

clean: pcassembly/*.class pcassembly/*/*.class
	rm pcassembly/*.class
	rm pcassembly/*/*.class