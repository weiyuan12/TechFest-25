# Build stage
FROM maven:3.9-eclipse-temurin-21 as build
# Sets the working directory inside the container to /app
WORKDIR /app
COPY pom.xml .
# Copies your source code directory into the container
COPY src ./src
RUN mvn clean install -DskipTests

# Runtime stage
FROM eclipse-temurin:21

# Install MongoDB tools
RUN apt-get update && apt-get install -y wget gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt-get update && apt-get install -y mongodb-database-tools

VOLUME /tmp

# Copies the JAR file created in the build stage into the runtime container
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java","-Xmx2g","-Xms2g","-jar","/app.jar"]