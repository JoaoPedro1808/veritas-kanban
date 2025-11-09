package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	_"github.com/glebarez/sqlite"
)

var db *sql.DB
var err error

func main() {
	mux := http.NewServeMux()

	// Inicializando ligação com o banco de dados
	db, err = initDB()
	
	if err != nil {
		log.Fatal(err)
	}
	
	// Fecha o banco de dados apos o uso
	defer db.Close()

	log.Printf("Banco de dados carregado")

	// Define as rotas designadas para os testes
	mux.HandleFunc("GET /tasks", listTasksHandler)
	mux.HandleFunc("POST /tasks", createTaskHandler)
	mux.HandleFunc("PUT /tasks/{id}", updateTaskHandler)
	mux.HandleFunc("DELETE /tasks/{id}", deleteTaskHandler)

	// Comunicação direta para o "frontend"
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
	
	fmt.Println("Servidor Go rodando na porta 8080")

	if err := http.ListenAndServe(":8080", corsHandler(mux)); err != nil {
		log.Fatalf("Não foi possível iniciar o servidor: %v", err)
	}
}

func initDB() (*sql.DB, error) {
	db, err = sql.Open("sqlite", "./kanban.db")

	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	createTableSQL := `
	CREATE TABLE IF NOT EXISTS task (
		"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		"nome" TEXT,
		"desc" TEXT,
		"status" TEXT
	)`;

	_, err = db.Exec(createTableSQL)
	if err != nil {
		return nil, fmt.Errorf("erro ao tentar iniciar a tabela: %w", err)
	}

	return db, nil
}