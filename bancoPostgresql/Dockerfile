FROM library/postgres
ENV POSTGRES_USER host
ENV POSTGRES_PASSWORD jfs123
ENV POSTGRES_DB videosDB
COPY index.sql /docker-entrypoint-initdb.d/
EXPOSE 3006