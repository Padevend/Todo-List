<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/index.css">
    <title>Todo List</title>
</head>
<body>
    <header>
        <h1>TODO-LIST</h1>
        <div id="add-form">
            <input type="text" id="task" placeholder="add new task" name="task">
            <button type="submit">
                <ion-icon name="add-circle-outline"></ion-icon>
            </button>
        </div>
    </header>
    <article>
        <section>
            <div class="stack active" name="all" >All</div>
            <div class="stack" name="no-checked" >No completed</div>
            <div class="stack" name="checked" >Completed</div>
        </section>
        <div class="view">
            <ul>
                
            </ul>
        </div>
    </article>
</body>
<script src="./script/script.js"></script>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</html>