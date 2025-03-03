<?php
    class TasksManager{
        private $DB_SERVER = "localhost";
        private $DB_USER = "root";
        private $DB_PASSWORD = "";
        private $DB_NAME = "todo";

        public function __construct(){
            $this->conn = new mysqli($this->DB_SERVER, 
                                    $this->DB_USER,
                                    $this->DB_PASSWORD,
                                    $this->DB_NAME);
            
        }

        //creation d'une nouvelle tache
        public function create_task(string $task): string{
            $sql = "INSERT INTO tasks (task) VALUES ('$task')";

            if($this->conn->query($sql)===true){
                return "success";
            }else{
                return "error";
            }
        }

        //mise a jour d'une tache existante
        public function update_task(int $id, string $new){
            $sql = "UPDATE tasks SET task = '$new' WHERE tasks.id = $id";

            if($this->conn->query($sql)===true){
                return "success";
            }else{
                return "error";
            }
        }

        //supression d'une tache
        public function remove_task(int $id){
            $sql = "DELETE FROM tasks WHERE tasks.id = $id";

            if($this->conn->query($sql)===true){
                return "success";
            }else{
                return "error";
            }
        }

        //completion d'une ache
        public function check_task(int $id){
            $sql = "UPDATE tasks SET isCompleted = '1' WHERE tasks.id = $id";

            if($this->conn->query($sql)===true){
                return "success";
            }else{
                return "error";
            }
        }

        //decompletion d'une ache
        public function uncheck_task(int $id){
            $sql = "UPDATE tasks SET isCompleted = '0' WHERE tasks.id = $id";

            if($this->conn->query($sql)===true){
                return "success";
            }else{
                return "error";
            }
        }

        //recuperer toute les tache existante
        public function get_all_task(){
            $sql = "SELECT * FROM tasks ORDER BY date DESC";

            $result = $this->conn->query($sql);
            $array = [];
            if($result->num_rows > 0){
                while($ligne = $result->fetch_assoc()){
                    array_push($array, $ligne);
                }
                
                return $array;
            }else{
                return "";
            }
        }

        //recuperer toutes les taches completer
        public function get_checked_task(){
            $sql = "SELECT * FROM tasks WHERE isCompleted = '1'";

            $result = $this->conn->query($sql);
            $array = [];
            if($result->num_rows > 0){
                while($ligne = $result->fetch_assoc()){
                    array_push($array, $ligne);
                }
                return $array;
            }else{
                return "";
            }
        }

        //retourne les tache non accompli
        public function get_nochecked_task(){
            $sql = "SELECT * FROM tasks WHERE isCompleted = '0'";

            $result = $this->conn->query($sql);
            $array = [];
            if($result->num_rows > 0){
                while($ligne = $result->fetch_assoc()){
                    array_push($array, $ligne);
                }
                return $array;
            }else{
                return "";
            }
        }

    }