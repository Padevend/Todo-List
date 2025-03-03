<?php
    header('Content-Type: application/json');

    require_once("config.php");
    $TasksManager = new TasksManager();

    //recuperation des donnee de javascript
    $data = json_decode(file_get_contents("php://input"), true);

    $action = $data["action"];

    switch ($action) {
        case 'create':
            $task = $data["task"];

            $TasksManager->create_task($task);
            $response = [
                "status"=>200,
                "text"=>"ajouter avec success"
            ];
            break;
        case 'update':
            $id = $data["id"];
            $new_task = $data["task"];

            $TasksManager->update_task($id, $new_task);
            $response = [
                "status"=>200,
                "text"=>"modifier avec success"
            ];
            break;
        case 'remove':
            $id = $data["id"];

            $TasksManager->remove_task($id);
            $response = [
                "status"=>200,
                "text"=>"supprimer avec success"
            ];
            
            break;
        case 'check':
            $id = $data["id"];

            $TasksManager->check_task($id);
            $response = [
                "status"=>200,
                "text"=>"completer avec success"
            ];
            
            break;
        case 'uncheck':
            $id = $data["id"];

            $TasksManager->uncheck_task($id);
            $response = [
                "status"=>200,
                "text"=>"completer avec success"
            ];
            
            break;
        case 'get_all':
            $response = [
                "data"=>$TasksManager->get_all_task()
            ];
            break;
        case 'get_checked':
            $response = [
                "data"=>$TasksManager->get_checked_task()
            ];
            break;
        case 'get_no_checked':
            $response = [
                "data"=>$TasksManager->get_nochecked_task()
            ];
            break;
        default:
            $response = [];
            break;
    }

    echo json_encode($response)


// $d = new TasksManager();
// $d->get_checked_task();
?>